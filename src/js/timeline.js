let timeline = gsap.timeline({ repeat: 1 });

timeline
  .to("#overlay", {
    "--spotlight-x": 600,
    "--spotlight-y": 200,
    duration: 3,
    delay: 0
  })
  .to("#overlay", {
    "--spotlight-x": 1000,
    "--spotlight-y": 400,
    duration: 2,
    delay: 5
  })
  .to("#overlay", {
    "--spotlight-x": 200,
    "--spotlight-y": 200,
    duration: 3,
    delay: 5
  });
