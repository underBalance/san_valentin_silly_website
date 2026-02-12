/* global gsap */

// Texts to rotate in the speech bubble.
const messages = [
  "Alguien me ha pedido que te entregue unas flores",
  "ya que me ha dicho que le preocupaba que nadie te diera flores este dia.",
  "Y nada eso, si alguien te da unas reales mejor que mejor,",
  "pero sino yo te entrego estas."
];

const bubble = document.querySelector(".bubble");
const finalGlow = document.querySelector(".final-glow");
const cat = document.querySelector(".cat");
const roses = document.querySelector(".roses");

let messageIndex = 0;
let showingCat = true;

function setMessage(text) {
  bubble.textContent = text;
}

function cycleMessages() {
  setMessage(messages[messageIndex]);
  messageIndex = (messageIndex + 1) % messages.length;
}

function toggleGift() {
  showingCat = !showingCat;

  if (showingCat) {
    gsap.to(roses, { opacity: 0, scale: 0.6, y: 20, duration: 0.45, ease: "power2.in" });
    gsap.to(cat, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.6)" });
  } else {
    gsap.to(cat, { opacity: 0, scale: 0.6, y: 20, duration: 0.45, ease: "power2.in" });
    gsap.to(roses, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.6)" });
  }

  gsap.to(finalGlow, { opacity: 1, duration: 0.8, ease: "power2.out" });
  gsap.to(finalGlow, { opacity: 0, duration: 1, delay: 0.6, ease: "power2.out" });
}

function runAnimation() {
  gsap.set(cat, { scale: 0, opacity: 0, y: 30 });
  gsap.set(bubble, { opacity: 0, y: -10 });
  gsap.set(roses, { opacity: 0, scale: 0.6, y: 20 });

  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  timeline
    .to(cat, { scale: 1, opacity: 1, y: 0, duration: 1.1 })
    .to(bubble, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
    .add(() => {
      cycleMessages();
      // Change the message every 2.8 seconds.
      setInterval(cycleMessages, 2800);
    })
    .to(cat, { scale: 1.05, duration: 1.2 }, "+=1");
}

// Toggle cat/roses on every touch/click.
document.addEventListener("pointerdown", toggleGift);

runAnimation();
