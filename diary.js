const STORAGE_KEY = "mrComputerPaperDiary.v1";
const KCAL_PER_KG = 7700;
const foodDatabase = [
  ["米饭", 116], ["馒头", 223], ["面条", 110], ["鸡胸肉", 133], ["鸡蛋", 143],
  ["牛肉", 125], ["三文鱼", 208], ["虾", 99], ["豆腐", 81], ["西兰花", 34],
  ["生菜", 16], ["苹果", 52], ["香蕉", 89], ["牛奶", 54], ["酸奶", 72],
  ["拿铁", 45], ["奶茶", 70], ["薯片", 548], ["饼干", 435], ["火锅", 180], ["沙拉", 70]
].map(([name, kcalPer100g]) => ({ name, kcalPer100g }));

const defaultState = {
  profile: { height: "", weight: "", targetLossJin: "", age: 28, sex: "female", activity: "1.2" },
  logs: {}
};
const state = loadState();
const $ = (selector) => document.querySelector(selector);
const els = {
  profileForm: $("#profile-form"), height: $("#height"), weight: $("#weight"), targetLossJin: $("#target-loss-jin"),
  age: $("#age"), sex: $("#sex"), activity: $("#activity"), resetButton: $("#reset-button"),
  dailyTarget: $("#daily-target"), todayIntake: $("#today-intake"), todayDeficit: $("#today-deficit"), daysLeft: $("#days-left"),
  logDate: $("#log-date"), foodForm: $("#food-form"), foodName: $("#food-name"), foodGrams: $("#food-grams"),
  foodCalories: $("#food-calories"), foodPhoto: $("#food-photo"), foodList: $("#food-list"), estimateHint: $("#estimate-hint"),
  foodLog: $("#food-log"), dayTotal: $("#day-total"), progressFill: $("#progress-fill"),
  progressCopy: $("#progress-copy"), lossKg: $("#loss-kg"), totalDeficit: $("#total-deficit"), loggedDays: $("#logged-days")
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultState, ...saved, profile: { ...defaultState.profile, ...(saved?.profile || {}) }, logs: saved?.logs || {} };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function numberValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function calculatePlan() {
  const height = numberValue(state.profile.height);
  const weight = numberValue(state.profile.weight);
  const targetLossJin = numberValue(state.profile.targetLossJin);
  const age = numberValue(state.profile.age);
  if (!height || !weight || !targetLossJin || !age) return null;
  const bmr = 10 * weight + 6.25 * height - 5 * age + (state.profile.sex === "male" ? 5 : -161);
  const maintenance = Math.round(bmr * numberValue(state.profile.activity));
  const dailyTarget = Math.max(state.profile.sex === "male" ? 1500 : 1200, maintenance - 500);
  const lossKg = targetLossJin / 2;
  return { maintenance, dailyTarget, plannedDeficit: Math.max(maintenance - dailyTarget, 1), lossKg, targetDeficit: lossKg * KCAL_PER_KG };
}

function getLog(dateKey = els.logDate.value) {
  if (!state.logs[dateKey]) state.logs[dateKey] = [];
  return state.logs[dateKey];
}

function getDailyCalories(dateKey) {
  return (state.logs[dateKey] || []).reduce((sum, item) => sum + numberValue(item.calories), 0);
}

function findFoodMatch(name) {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return null;
  return foodDatabase.find((food) => normalized.includes(food.name.toLowerCase()) || food.name.toLowerCase().includes(normalized));
}

function estimateFoodCalories() {
  const match = findFoodMatch(els.foodName.value);
  const grams = Math.max(numberValue(els.foodGrams.value), 0);
  if (!match || !grams) {
    els.estimateHint.textContent = "输入常见食物名后，会按克数帮你估算热量。";
    return;
  }
  const estimated = Math.round((match.kcalPer100g * grams) / 100);
  if (!els.foodCalories.value || els.foodCalories.dataset.estimated === "true") {
    els.foodCalories.value = estimated;
    els.foodCalories.dataset.estimated = "true";
  }
  els.estimateHint.textContent = `${match.name} 约 ${match.kcalPer100g} kcal / 100g，当前估算 ${estimated} kcal。`;
}

function readPhoto(file) {
  return new Promise((resolve) => {
    if (!file) return resolve("");
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

function renderFoodLog() {
  const log = getLog(els.logDate.value);
  if (!log.length) {
    els.foodLog.innerHTML = `<div class="empty-state">这一天还没有记录。</div>`;
    return;
  }
  els.foodLog.innerHTML = log.map((item) => {
    const thumb = item.photo ? `<img class="food-thumb" src="${item.photo}" alt="${escapeHtml(item.name)}" />` : `<div class="food-thumb" aria-hidden="true"></div>`;
    return `<article class="food-item">${thumb}<div><p class="food-name">${escapeHtml(item.name)}</p><p class="food-meta">${Math.round(item.grams || 0)}g · ${Math.round(item.calories || 0)} kcal</p></div><button class="delete-food" type="button" data-id="${item.id}">×</button></article>`;
  }).join("");
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function renderSummary() {
  const plan = calculatePlan();
  const intake = getDailyCalories(els.logDate.value);
  els.todayIntake.textContent = Math.round(intake);
  els.dayTotal.textContent = Math.round(intake);
  els.loggedDays.textContent = Object.values(state.logs).filter((items) => items.length > 0).length;
  if (!plan) {
    els.dailyTarget.textContent = "--";
    els.todayDeficit.textContent = "--";
    els.daysLeft.textContent = "--";
    els.lossKg.textContent = "--";
    els.totalDeficit.textContent = "0";
    els.progressFill.style.width = "0%";
    els.progressCopy.textContent = "先保存目标，就能开始计算。";
    return;
  }
  const totalDeficit = Object.keys(state.logs).reduce((sum, dateKey) => sum + Math.max(plan.maintenance - getDailyCalories(dateKey), 0), 0);
  const remainingDeficit = Math.max(plan.targetDeficit - totalDeficit, 0);
  const daysLeft = remainingDeficit === 0 ? 0 : Math.ceil(remainingDeficit / plan.plannedDeficit);
  els.dailyTarget.textContent = plan.dailyTarget;
  els.todayDeficit.textContent = Math.round(plan.maintenance - intake);
  els.daysLeft.textContent = daysLeft;
  els.lossKg.textContent = Number.isInteger(plan.lossKg) ? plan.lossKg : plan.lossKg.toFixed(1);
  els.totalDeficit.textContent = Math.round(totalDeficit);
  els.progressFill.style.width = `${Math.min((totalDeficit / plan.targetDeficit) * 100, 100)}%`;
  els.progressCopy.textContent = remainingDeficit === 0 ? "目标达成，可以转入温和维持。" : `还差约 ${Math.round(remainingDeficit)} kcal 的缺口。`;
}

function syncProfileForm() {
  els.height.value = state.profile.height;
  els.weight.value = state.profile.weight;
  els.targetLossJin.value = state.profile.targetLossJin;
  els.age.value = state.profile.age;
  els.sex.value = state.profile.sex;
  els.activity.value = state.profile.activity;
}

els.foodList.innerHTML = foodDatabase.map((food) => `<option value="${food.name}"></option>`).join("");
els.logDate.value = todayKey();
syncProfileForm();

els.profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.profile = { height: els.height.value, weight: els.weight.value, targetLossJin: els.targetLossJin.value, age: els.age.value, sex: els.sex.value, activity: els.activity.value };
  saveState();
  renderSummary();
});

els.foodForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const photoFile = els.foodPhoto.files?.[0];
  const name = els.foodName.value.trim() || "图片记录";
  const grams = numberValue(els.foodGrams.value) || 100;
  const match = findFoodMatch(name);
  const calories = numberValue(els.foodCalories.value) || Math.round(((match?.kcalPer100g || 0) * grams) / 100);
  if (!name || !calories) {
    els.estimateHint.textContent = "请填写食物名和热量。";
    return;
  }
  getLog().push({ id: `${Date.now()}-${Math.random()}`, name, grams, calories, photo: await readPhoto(photoFile) });
  els.foodForm.reset();
  els.foodGrams.value = 100;
  delete els.foodCalories.dataset.estimated;
  saveState();
  renderFoodLog();
  renderSummary();
});

els.foodLog.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-food");
  if (!button) return;
  const log = getLog();
  const index = log.findIndex((item) => item.id === button.dataset.id);
  if (index >= 0) log.splice(index, 1);
  saveState();
  renderFoodLog();
  renderSummary();
});

els.foodName.addEventListener("input", estimateFoodCalories);
els.foodGrams.addEventListener("input", estimateFoodCalories);
els.foodCalories.addEventListener("input", () => { els.foodCalories.dataset.estimated = "false"; });
els.logDate.addEventListener("change", () => { renderFoodLog(); renderSummary(); });
els.resetButton.addEventListener("click", () => {
  if (!confirm("确定要清空目标和记录吗？")) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
});

renderFoodLog();
renderSummary();
