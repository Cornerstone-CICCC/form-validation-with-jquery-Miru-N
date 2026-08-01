$(function () {
  const maximumCharacters = 140;

  const $form = $("#message-form");
  const $message = $("#message");
  const $errorMessage = $("#error-message");
  const $characterCount = $("#character-count");
  const $messageList = $("#message-list");

  function updateCharacterCount() {
    const currentLength = $message.val().length;

    $characterCount.text(
      currentLength + " / " + maximumCharacters
    );

    if (currentLength > maximumCharacters) {
      $characterCount.addClass("is-over-limit");
    } else {
      $characterCount.removeClass("is-over-limit");
    }
  }

  function showError(message) {
    $errorMessage.text(message);
    $message.addClass("has-error");
  }

  function clearError() {
    $errorMessage.text("");
    $message.removeClass("has-error");
  }

  $message.on("input", function () {
    updateCharacterCount();
    clearError();
  });

  $form.on("submit", function (event) {
    event.preventDefault();

    const submittedMessage =
      $.trim($message.val());

    if (submittedMessage.length === 0) {
      showError("Please enter a message.");

      $message.trigger("focus");

      return;
    }

    if (
      submittedMessage.length >
      maximumCharacters
    ) {
      showError(
        "Your message must be 140 characters or fewer."
      );

      $message.trigger("focus");

      return;
    }

    $(".empty-message").remove();

    const $newMessage = $("<article>", {
      class: "submitted-message"
    });

    const $messageText = $("<p>").text(
      submittedMessage
    );

    $newMessage.append($messageText);
    $messageList.prepend($newMessage);

    $message.val("");

    clearError();
    updateCharacterCount();

    $message.trigger("focus");
  });

  updateCharacterCount();
});