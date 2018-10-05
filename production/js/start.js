function start() {
  let startModal = new Modal('500px', '500px', 'Начало игры!', 'start-modal');

  startModal.tune(); // Применить настройки модального окна
  startModal.show();

  Smile.set();

  let startButton = document.querySelector('.start-modal__buttons .start'),
      buttonsController = new ButtonsController();

  buttonsController.startGame(startButton, startModal);
}

start();
