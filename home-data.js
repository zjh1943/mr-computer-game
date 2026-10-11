((root)=>{
const games=[
['computer','电脑先生','Mr Computer','computer','computer','我的游戏小宇宙','会聊天、会唱歌、会吃东西的小电脑。屏幕里的应用商店，还藏着我的其他游戏！'],
['world','节奏盒子世界','Sprunki World','sprunki-world','world','探索 · 创造 · 合奏','和快乐机器人交朋友，探索音乐小镇，创造自己的角色，一起举办演唱会。'],
['minecraft','我的世界 2D','Minecraft 2D','minecraft','blocks','挖掘与建造','从一块草地方块开始，挖矿、收集材料，把脑海里的房子搭出来。'],
['minecraft3d','我的世界 3D','Minecraft 3D','minecraft3d','blocks','走进方块世界','在立体方块世界里探索、建造与生存，寻找你的下一次冒险。'],
['dance','节奏音乐游戏','Sprunki Beats','sprunki','music','跟着节拍出发','选择喜欢的角色和歌曲，接住节奏箭头，让整个舞台一起跳起来。'],
['town','小镇','Little Town','town','town','朋友们的日常','逛商店、布置房子、认识居民，看看小镇的白天和夜晚。'],
['diary','日记剪纸房','Paper Diary','diary','diary','把故事留下来','走进纸片组成的小房间，用日记记录生活里的小发现。'],
['snake','贪吃蛇','Pixel Snake','snake','snake','经典小游戏','吃到食物就长大一点，小心别撞到自己！'],
['merge2048','2048','Number Blocks','2048','numbers','数字小挑战','移动方块、合并数字，看看你能拼出多大的数字。'],
['tictactoe','双人井字棋','Tic Tac Toe','tictactoe','chess','邀请朋友一起玩','你画一个圈，我画一个叉。先连成一条线的人获胜！'],
['memory','记忆翻牌','Memory Match','memory','diary','记忆力挑战','翻开卡片，记住位置，找到每一对相同的图案。'],
['piano','小钢琴','Little Piano','piano','music','我的音乐角','按下琴键，让自己的小旋律在这里响起来。']
].map(([id,name,english,domain,icon,tag,description])=>({id,name,english,domain,icon,tag,description}));
function ageAt(day){const [y,m,d]=day.split('-').map(Number);return y-2018-Number(m<2||(m===2&&d<23));}
function gameUrl(game){return '/games/'+game.domain;}
const data={games,ageAt,gameUrl};if(typeof module!=='undefined')module.exports=data;else root.HomeData=data;
})(typeof window!=='undefined'?window:globalThis);
