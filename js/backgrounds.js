const codeMap = {
  0: "sunny",
  1: "sunny",
  2: "partly-cloudy",
  3: "overcast",
  45: "fog",
  48: "fog",
  51: "drizzle",
  53: "drizzle",
  55: "drizzle",
  56: "drizzle",
  57: "drizzle",
  61: "rain",
  63: "rain",
  65: "rain",
  66: "rain",
  67: "rain",
  80: "rain",
  81: "rain",
  82: "rain",
  71: "snow",
  73: "snow",
  75: "snow",
  77: "snow",
  85: "snow",
  86: "snow",
  95: "storm",
  96: "storm",
  99: "storm",
};

const bodyBgMap = {
  sunny: "bg-sunny",
  "partly-cloudy": "bg-partly-cloudy",
  overcast: "bg-overcast",
  fog: "bg-fog",
  drizzle: "bg-drizzle",
  rain: "bg-rain",
  snow: "bg-snow",
  storm: "bg-storm",
};

export function animateBg(code, isDay) {
  // 1. Body background
  const body = document.body;
  Object.values(bodyBgMap).forEach((cls) => body.classList.remove(cls));
  body.classList.remove("bg-night");
  const condition = codeMap[code] || "sunny";
  body.classList.add(isDay === 0 ? "bg-night" : bodyBgMap[condition]);

  // 2. Card particle animation
  const card = document.querySelector(".first-result");
  if (!card) return;

  // Remove old canvas if present
  const old = card.querySelector(".weather-canvas");
  if (old) old.remove();

  const canvas = document.createElement("canvas");
  canvas.classList.add("weather-canvas");
  canvas.style.cssText = `
    position:absolute;top:0;left:0;width:100%;height:100%;
    pointer-events:none;border-radius:inherit;z-index:0;
  `;
  card.insertBefore(canvas, card.firstChild);

  const ctx = canvas.getContext("2d");
  let animId;

  function resize() {
    canvas.width = card.offsetWidth;
    canvas.height = card.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  // --- RAIN ---
  if (
    condition === "rain" ||
    condition === "drizzle" ||
    condition === "storm"
  ) {
    const drops = Array.from(
      { length: condition === "drizzle" ? 40 : 80 },
      () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 4 + Math.random() * 6,
        length: 10 + Math.random() * 10,
        opacity: 0.3 + Math.random() * 0.4,
      }),
    );

    function drawRain() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drops.forEach((d) => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1, d.y + d.length);
        ctx.strokeStyle = `rgba(174,214,241,${d.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        d.y += d.speed;
        if (d.y > canvas.height) {
          d.y = -d.length;
          d.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(drawRain);
    }
    drawRain();

    // --- SNOW ---
  } else if (condition === "snow") {
    const flakes = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 2 + Math.random() * 3,
      speed: 0.5 + Math.random() * 1.5,
      drift: (Math.random() - 0.5) * 0.5,
      opacity: 0.4 + Math.random() * 0.5,
    }));

    function drawSnow() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flakes.forEach((f) => {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${f.opacity})`;
        ctx.fill();
        f.y += f.speed;
        f.x += f.drift;
        if (f.y > canvas.height) {
          f.y = -f.r;
          f.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(drawSnow);
    }
    drawSnow();

    // --- SUNNY ---
  } else if (condition === "sunny" && isDay === 1) {
    const rays = Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      length: 0,
      maxLength: 30 + Math.random() * 20,
      speed: 0.3 + Math.random() * 0.3,
      growing: true,
    }));
    const cx = canvas.width * 0.75;
    const cy = canvas.height * 0.25;

    function drawSun() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rays.forEach((ray) => {
        const x1 = cx + Math.cos(ray.angle) * 18;
        const y1 = cy + Math.sin(ray.angle) * 18;
        const x2 = cx + Math.cos(ray.angle) * (18 + ray.length);
        const y2 = cy + Math.sin(ray.angle) * (18 + ray.length);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(246,166,35,0.5)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        if (ray.growing) {
          ray.length += ray.speed;
          if (ray.length >= ray.maxLength) ray.growing = false;
        } else {
          ray.length -= ray.speed;
          if (ray.length <= 0) ray.growing = true;
        }
      });
      animId = requestAnimationFrame(drawSun);
    }
    drawSun();

    // --- STARS at night ---
  } else if (isDay === 0) {
    const stars = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.5 + Math.random() * 1.5,
      opacity: Math.random(),
      speed: 0.005 + Math.random() * 0.01,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
        s.opacity += s.speed * s.dir;
        if (s.opacity >= 1) s.dir = -1;
        if (s.opacity <= 0) s.dir = 1;
      });
      animId = requestAnimationFrame(drawStars);
    }
    drawStars();

    // --- FOG / OVERCAST / PARTLY CLOUDY ---
  } else {
    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 20 + Math.random() * 40,
      opacity: 0.03 + Math.random() * 0.06,
      speed: 0.1 + Math.random() * 0.2,
    }));

    function drawClouds() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
        p.x += p.speed;
        if (p.x - p.r > canvas.width) p.x = -p.r;
      });
      animId = requestAnimationFrame(drawClouds);
    }
    drawClouds();
  }

  // Store cancel fn on card so next call can clean up
  if (card._cancelBgAnim) card._cancelBgAnim();
  card._cancelBgAnim = () => {
    cancelAnimationFrame(animId);
    window.removeEventListener("resize", resize);
  };
}
