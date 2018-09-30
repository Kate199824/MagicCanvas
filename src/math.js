import utils from './utils';

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  }

  return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  if(xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    const angle = - Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

    const m1 = particle.mass;
    const m2 = particle.mass;

    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
    const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

function attractionGravity(mouse, particle) {
  const G = 15;
  const angle =  Math.atan((particle.y - mouse.y) / (mouse.x - particle.x));

  const M = mouse.mass;
  const m = particle.mass;

  const distance = utils.distance(mouse.x,mouse.y,particle.x,particle.y);
  if(distance <= (particle.radius + mouse.radius)) {
    particle.velocity.x = 0;
    particle.velocity.y = 0;
    return;
  }

  const F = (G * M * m) / (distance * distance);

  const a = F / m;

  const ay = a * Math.cos(angle) * (particle.y > mouse.y ? -1 : 1);
  const ax = a * Math.cos(angle) * (particle.x > mouse.x ? -1 : 1);

  particle.velocity.x += ax;
  particle.velocity.y += ay;

}

module.exports = { resolveCollision, attractionGravity };