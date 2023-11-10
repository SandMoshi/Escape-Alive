const scrambleText = (el, text, startCB, endCB) => {
  let chars = "!<>-_\\/[]{}—=+*^?#________";
  let resolvePromise;
  let frameRequest;
  let frame;
  let queue = [];

  const setText = (newText) => {
    const oldText = el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (resolvePromise = resolve));
    queue = [];
    startCB && startCB();
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(frameRequest);
    frame = 0;
    update();
    return promise;
  };
  const update = () => {
    let output = "";
    let complete = 0;
    for (let i = 0, n = queue.length; i < n; i++) {
      let { from, to, start, end, char } = queue[i];
      if (frame >= end) {
        complete++;
        output += to;
      } else if (frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = randomChar();
          queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    el.innerHTML = output;
    if (complete === queue.length) {
      resolvePromise();
      endCB && endCB();
    } else {
      frameRequest = requestAnimationFrame(update);
      frame++;
    }
  };
  const randomChar = () => {
    return chars[Math.floor(Math.random() * chars.length)];
  };

  setText(text);
};

export { scrambleText };
