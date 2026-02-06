export const vertexShader = `
precision lowp float;
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const fragmentShader = `
precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

uniform float inRadius;
uniform float outRadius;
uniform vec2 center;

uniform float gradLength;
uniform float gradStrength;

uniform float sceneMix;

#define t (time * 3.0) / 1.0
#define X uv.x*32.0
#define Y uv.y*32.0

vec3 bgColor() {
  vec2 uv = (gl_FragCoord.xy - resolution.xy) / resolution.xy;

  float c = sin(
    (X + mouse.x * 0.0092) / (20. + cos((t + 100.) * 1.) * 10.) +
    (Y + mouse.y * 0.0115) / (25. + sin(t * 0.5) * 15.)
  ) * sin(
    (((X + mouse.x * 0.01725) * cos(t) +
    (Y + mouse.y * 0.02875) * sin(t) * 1.5)
    * (.025 + sin(t) * .05))
  );

  c += cos((X + mouse.x * 0.01725) * (.075 + cos(t) * .025) + t)
       * abs(sin(Y * (.05 + sin(t + 75.) * .025)));

c = smoothstep(-1., 1., c);
c = mix(0.45, 1.0, c); 

  vec3 blueColor = vec3(1.0/255.0, 44.0/255.0, 186.0/255.0);

  return blueColor * c;
}


vec3 sunColor() {
  float rx = gl_FragCoord.x;
  float ry = resolution.y - gl_FragCoord.y;

  float dx = abs(center.x - rx);
  float dy = abs(center.y - ry);
  float d = sqrt(dx * dx + dy * dy);

  float b = step(d, inRadius);
  float diff = d - inRadius;
  float donut = outRadius - inRadius;

  if (diff > 0. && diff < donut) {
    b = (donut - diff) / donut;
  } else if (diff > -gradLength && diff < 0.) {
    b = 1. - ((inRadius - d) / gradLength);
  } else {
    b = 0.;
  }

  b = smoothstep(0.75 - gradStrength * .75, 1.5 - gradStrength * .5, b);

  vec3 blueColor = vec3(1.0/255.0, 44.0/255.0, 186.0/255.0);

  return blueColor * b;
}


void main() {
  vec3 color = smoothstep(0., 1., mix(sunColor(), bgColor(), sceneMix));
  gl_FragColor = vec4(color, 1.);
}
`;
