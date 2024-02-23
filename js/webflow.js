document.addEventListener("DOMContentLoaded", function() {
  var dynamicText = document.querySelector('.dynamic-text');
  var words = ['UX/UI Designer', 'UX Researcher', 'Web Developer' , 'DESIGNER'];
  var letterCount = 0;
  var wordIndex = 0;
  var currentWord = '';
  var isDeleting = false;
  var typingDelay = 200; 
  var deleteSpeed = 100; 
  var newWordDelay = 1000; 

  function typeWords() {
      if (isDeleting) {
          currentWord = words[wordIndex].substring(0, letterCount - 1);
          letterCount--;
          typingDelay = deleteSpeed;
      } else {
          currentWord = words[wordIndex].substring(0, letterCount + 1);
          letterCount++;
      }
      dynamicText.textContent = currentWord;

      if (!isDeleting && letterCount === words[wordIndex].length) {
          typingDelay = newWordDelay;
          isDeleting = true;
      } else if (isDeleting && letterCount === 0) {
          wordIndex = (wordIndex + 1) % words.length;
          isDeleting = false;
      }

      setTimeout(typeWords, typingDelay);
  }

  typeWords();
});

function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

const cursor = document.querySelector('.cursor');
const cursorinner = document.querySelector('.cursor2');
const a = document.querySelectorAll('a');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    // console.log(`the x pos= ${x}`);
    const y = e.clientY;
    cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
  });

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  cursorinner.style.left = `${x}px`;
  cursorinner.style.top = `${y}px`;
});

document.addEventListener('mousedown', () => {
  cursorinner.classList.add('cursorinnerhover');
});

document.addEventListener('mouseup', () => {
  cursorinner.classList.remove('cursorinnerhover');
});

a.forEach(item => {
  // console.log(item);
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const revealElements = document.querySelectorAll('.element-to-reveal');
  
  const revealOnScroll = () => {
    for (let i = 0; i < revealElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150; // Adjust based on when you want the element to start appearing

      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add('revealed');
      } else {
        revealElements[i].classList.remove('revealed');
      }
    }
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // To check the scroll position on page load
});

$(document).ready(function() {
  var containers = $('.container');

  if (containers.length) {
      containers.each(function() {
          var container = $(this);

          // Support small text - copy to fill screen width
          if (container.find('.scrolling-text').outerWidth() < $(window).width()) {
              var windowToScrolltextRatio = Math.round($(window).width() / container.find('.scrolling-text').outerWidth()),
                  scrollTextContent = container.find('.scrolling-text .scrolling-text-content').text(),
                  newScrollText = '';
              for (var i = 0; i < windowToScrolltextRatio; i++) {
                  newScrollText += ' ' + scrollTextContent;
              }
              container.find('.scrolling-text .scrolling-text-content').text(newScrollText);
          }

          // Init variables and config
          var scrollingText = container.find('.scrolling-text'),
              scrollingTextWidth = scrollingText.outerWidth(),
              scrollingTextHeight = scrollingText.outerHeight(true),
              startLetterIndent = parseInt(scrollingText.find('.scrolling-text-content').css('font-size'), 10) / 4.8,
              startLetterIndent = Math.round(startLetterIndent),
              scrollAmountBoundary = Math.abs($(window).width() - scrollingTextWidth),
              transformAmount = 0,
              leftBound = 0,
              rightBound = scrollAmountBoundary,
              transformDirection = container.hasClass('left-to-right') ? -1 : 1,
              transformSpeed = -50;

          // Read transform speed
          if (container.attr('speed')) {
              transformSpeed = container.attr('speed');
          }
      
          // Make scrolling text copy for scrolling infinity
          container.append(scrollingText.clone().addClass('scrolling-text-copy'));
          container.find('.scrolling-text').css({'position': 'absolute', 'left': 0});
          container.css('height', scrollingTextHeight);
      
          var getActiveScrollingText = function(direction) {
              var firstScrollingText = container.find('.scrolling-text:nth-child(1)');
              var secondScrollingText = container.find('.scrolling-text:nth-child(2)');
      
              var firstScrollingTextLeft = parseInt(container.find('.scrolling-text:nth-child(1)').css("left"), 10);
              var secondScrollingTextLeft = parseInt(container.find('.scrolling-text:nth-child(2)').css("left"), 10);
      
              if (direction === 'left') {
                  return firstScrollingTextLeft < secondScrollingTextLeft ? secondScrollingText : firstScrollingText;
              } else if (direction === 'right') {
                  return firstScrollingTextLeft > secondScrollingTextLeft ? secondScrollingText : firstScrollingText;
              }
          }
      
          $(window).on('wheel', function(e) {
              var delta = e.originalEvent.deltaY;
              
              if (delta > 0) {
                  // going down
                  transformAmount += transformSpeed * transformDirection;
                  container.find('.scrolling-text .scrolling-text-content').css('transform', 'skewX(10deg)');
              }
              else {
                  transformAmount -= transformSpeed * transformDirection;
                  container.find('.scrolling-text .scrolling-text-content').css('transform', 'skewX(-10deg)');
              }
              setTimeout(function(){
                  container.find('.scrolling-text').css('transform', 'translate3d('+ transformAmount * -1 +'px, 0, 0)');
              }, 10);
              setTimeout(function() {
                  container.find('.scrolling-text .scrolling-text-content').css('transform', 'skewX(0)');
              }, 500)
      
              // Boundaries
              if (transformAmount < leftBound) {
                  var activeText = getActiveScrollingText('left');
                  activeText.css({'left': Math.round(leftBound - scrollingTextWidth - startLetterIndent) + 'px'});
                  leftBound = parseInt(activeText.css("left"), 10);
                  rightBound = leftBound + scrollingTextWidth + scrollAmountBoundary + startLetterIndent;
      
              } else if (transformAmount > rightBound) {
                  var activeText = getActiveScrollingText('right');
                  activeText.css({'left': Math.round(rightBound + scrollingTextWidth - scrollAmountBoundary + startLetterIndent) + 'px'});
                  rightBound += scrollingTextWidth + startLetterIndent;
                  leftBound = rightBound - scrollingTextWidth - scrollAmountBoundary - startLetterIndent;
              }
          });
      })
  }
});

document.querySelectorAll('.expand-btn').forEach(button => {
    button.addEventListener('click', function() {
        this.parentElement.classList.toggle('expanded');
    });
});