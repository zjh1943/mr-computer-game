export const CAMERA_MODES=['third-near','first','third-far'];
export function nextCameraMode(mode='third-near'){const index=CAMERA_MODES.indexOf(mode);return CAMERA_MODES[(index+1+CAMERA_MODES.length)%CAMERA_MODES.length]}
export function cameraDistanceForMode(mode){return mode==='first'?0:mode==='third-far'?12:6.4}
