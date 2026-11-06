(function () {
  var figures = document.querySelectorAll(".post-figure");
  var dialog = document.getElementById("viewer");
  var viewerImage = document.getElementById("viewer-image");
  var viewerTitle = document.getElementById("viewer-title");
  var viewerCaption = document.getElementById("viewer-caption");
  var closeButton = document.getElementById("viewer-close");
  var lastTrigger = null;

  function setState(figure, state, message) {
    var status = figure.querySelector(".post-status");
    var retry = figure.querySelector(".retry");
    figure.dataset.state = state;
    status.textContent = message;
    retry.disabled = state === "loading";
  }

  figures.forEach(function (figure) {
    var image = figure.querySelector("img");
    var retry = figure.querySelector(".retry");
    var button = figure.querySelector(".post-photo");

    function ready() {
      setState(figure, "ready", "");
    }

    function failed() {
      setState(figure, "error", "This photo did not load.");
    }

    image.addEventListener("load", ready);
    image.addEventListener("error", failed);

    if (image.complete && image.naturalWidth > 0) {
      ready();
    } else if (image.complete) {
      failed();
    } else {
      setState(figure, "loading", "Loading photo.");
    }

    retry.addEventListener("click", function () {
      if (retry.disabled) {
        return;
      }
      var next = image.getAttribute("src").split("?")[0] + "?retry=" + Date.now();
      setState(figure, "loading", "Loading photo.");
      image.src = next;
    });

    button.addEventListener("click", function () {
      var post = button.closest(".post");
      viewerTitle.textContent = post.querySelector(".post-title").textContent;
      viewerCaption.textContent = post.querySelector(".post-body").textContent;
      viewerImage.alt = image.alt;
      viewerImage.width = image.naturalWidth || image.width;
      viewerImage.height = image.naturalHeight || image.height;
      viewerImage.src = image.currentSrc || image.src;
      lastTrigger = button;
      dialog.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener("click", function () {
    dialog.close();
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", function () {
    if (lastTrigger) {
      lastTrigger.focus();
    }
  });
})();
