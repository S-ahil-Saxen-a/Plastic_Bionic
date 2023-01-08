function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

init();

document.querySelector("#nav").addEventListener("mouseenter", function () {
  gsap.to(".cover", {
    stagger: 0.005,
    ease: Expo.easeInOut,
    duration: 0.6,
    height: "100%",
  });

  gsap.to(".cover p", {
    stagger: 0.1,
    ease: Expo.easeInOut,
    duration: 0.9,
    opacity: 1,
  });
});

document.querySelector("#nav").addEventListener("mouseleave", function () {
  gsap.to("#one", {
    stagger: 0.005,
    ease: Expo.easeInOut,
    duration: 0.6,
    height: "3%",
  });

  gsap.to("#two,#three", {
    stagger: 0.005,
    ease: Expo.easeInOut,
    duration: 0.6,
    height: "0.1%",
  });

  gsap.to(".cover p", {
    stagger: 0.1,
    ease: Expo.easeInOut,
    duration: 0.9,
    opacity: 0,
  });
});

document.querySelectorAll(".text").forEach(function (text) {
  text.addEventListener("mouseenter", function (dets) {
    gsap.to(dets.target.children[1], {
      width: "100%",
      ease: Expo.easeOut,
      duration: 0.5,
    });
  });

  text.addEventListener("mouseleave", function (dets) {
    gsap.to(dets.target.children[1], {
      width: "0%",
      left: "100%",
      ease: Expo.easeOut,
      duration: 0.5,
      onComplete: function () {
        dets.target.children[1].style.left = "0%";
      },
    });
  });
});

function boot() {
  var h1 = document.querySelector("h1");
  var clutter = "";

  var j = 0;

  for (var i = 0; i <= Math.floor(h1.textContent.length / 2); i++) {
    clutter += `<span data-delay = "${i}">${h1.textContent.charAt(j)}</span>`;
    j++;
  }

  for (var i = Math.floor(h1.textContent.length / 2) - 1; i >= 0; i--) {
    clutter += `<span data-delay = "${i}">${h1.textContent.charAt(j)}</span>`;
    j++;
  }

  document.querySelector("h1").innerHTML = clutter;

  document.querySelectorAll("h1 span").forEach(function (elem) {
    gsap.to(elem, {
      y: 0,
      duration: 1.2,
      ease: Expo.easeInOut,
      delay: elem.dataset.delay * 0.1,
    });
  });
}

boot();

var img = document.querySelector("#starter #box");



var t = gsap.timeline();

// gsap.to("#cube img",{
//   stagger: .8,

// })

t.to("#starter #box", {
  width: "300px",
  height: "430px",
  delay: 0.15,
  duration: 1.5,
  ease: Expo.easeInOut,
});

t.to("#starter #box", {
  width: "600px",
  height: "330px",
  // delay: .2,
  duration: 1.1,
  ease: Expo.easeInOut,
});

// t.to("#box #img2",{
//   zIndex: 999,
//   delay: -1,
//   stagger: 1,
//   ease: Expo.easeInOut
// })

t.to("#starter #box", {
  width: "300px",
  height: "430px",
  // delay: .2,
  duration: 1.1,
  ease: Expo.easeInOut,
});

// t.to("#box #img1",{
//   zIndex: 999,
//   delay: -1,
//   stagger: 1,
//   ease: Expo.easeInOut
// })

t.to("#starter #box", {
  width: "100%",
  height: "100%",
  // delay: .2,
  duration: 1.1,
  ease: Expo.easeInOut,
  onComplete: function () {
    document.querySelector("#starter").style.display = "none";
    animateHomeHeadings();
  },
});

// function animateAllHeadings() {
//   document.querySelectorAll(".text p")
//   .forEach(function (elem) {
//     var clutter = "";
//     elem.textContent.split("")
//     .forEach(function (letter) {
//       clutter += `<span>${letter}</span>`;
//       elem.innerHTML = clutter;
//     });
//   });

//   document.querySelectorAll("p span").forEach(function (elem) {
//     gsap.to(elem, {
//       y: 0,
//       duration: 2,
//       delay: -0.8,
//       ease: Expo.easeInOut
//       // delay: elem.dataset.delay * 0.1,
//     });
//   });
// }

function animateHomeHeadings(){
  var p = document.querySelector("#home p")
  var clutter = "";
  var j = 0;
  
  for(var i = 0; i < Math.floor(p.textContent.length/2); i++){
    clutter += `<span data-delay = "${i}">${p.textContent.charAt(j++)}</span>`;
  }
  for(var i = Math.floor(p.textContent.length/2)-1; i >= 0; i--){
    clutter += `<span data-delay = "${i}">${p.textContent.charAt(j)}</span>`;
    // console.log(p.textContent.charAt(j))
    if(p.textContent.charAt(j) == "/"){
      clutter += "<br>"
    }
    j++

  }

  document.querySelector("#home p").innerHTML = clutter;

  document.querySelectorAll("#home p span")
  .forEach(function (elem) {
    gsap.to(elem, {
      y: 0,
      duration: .7,
      ease: Expo.easeInOut,
      delay: elem.dataset.delay * 0.1,
    });
  });


}
