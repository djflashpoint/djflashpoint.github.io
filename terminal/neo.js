import { name, system } from 'os';
import { sleep } from 'time';
import { exit } from 'sys';

var BOLDON, CURSOROFF, CURSORON, DARK_GREEN, END, LIGHT_GREEN, _here, delayFactor, exitMsg, exitMsg2, msg1, msg2, msg3, msg4, remainFactor, secs1, secs2, urName, x1, x2;

function clearTrm() {
  /*Clears the terminal regardless of OS.
  For cool systems: 'clear'.
  For uncool systems: 'cls'.*/
  var _;

  if (name === "posix") {
    _ = system("clear");
  } else {
    _ = system("cls");
  }
}

function liveType(text = "liveType demo text", delay = 0.02, remain = 3) {
  /*Makes text strings seem typed live. Inspired in the film "The Matrix".
  PARAMETERS:
  'text' == text string to simulate typed live
  'delay' == seconds before new character shows up
  'remain' == seconds before message dissappears*/
  for (var letter, _pj_c = 0, _pj_a = text, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    letter = _pj_a[_pj_c];
    console.log(letter);
    sleep(delay);
  }

  sleep(remain);
}

LIGHT_GREEN = "\u001b[92m";
DARK_GREEN = "\u001b[0;32m";
BOLDON = "\u001b[1m";
CURSORON = "\u001b[?25h";
CURSOROFF = "\u001b[?25l";
END = "\u001b[0m";

if (__name__ === "__main__") {
  remainFactor = 0.2;
  delayFactor = 0.7;
  _here = "\n\n\n      ";
  urName = "Neo";
  msg1 = `Wake up, ${urName}...`;
  msg2 = "The Matrix has you...";
  msg3 = "Follow the white rabbit.";
  msg4 = `Knock, knock, ${urName}.`;
  exitMsg = "    671tcH iN Th3 M4tr1x\n";
  exitMsg2 = "         gLiTCh In tH\u20ac WaTriX\n";
  secs1 = [0, 0.15, 0.1625, 0.15, 0.1625, 0.15, 0.1625, 0.15, 0.12, 0.125, 0.12, 0.125, 0.0625, 0.0875, 0.0625];
  secs2 = [0, 0.7325, 0.67, 0.6, 0.78, 0.095, 0.135, 0.1075, 0.5275, 0.6225, 0.008, 0.12, 0.1475, 0.45, 0.008, 0.4275, 0.1275, 0.1425, 0.355, 0.2275, 0.145];

  try {
    clearTrm();
    console.log(BOLDON + LIGHT_GREEN + CURSOROFF);
    console.log(_here);
    x1 = 0;

    for (var i, _pj_c = 0, _pj_a = msg1, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      i = _pj_a[_pj_c];
      sleep(secs1[x1] * delayFactor);
      console.log(msg1[x1]);
      x1 += 1;
    }

    sleep(16.03 * remainFactor);
    clearTrm();
    console.log(_here);
    x2 = 0;

    for (var i, _pj_c = 0, _pj_a = msg2, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      i = _pj_a[_pj_c];
      sleep(secs2[x2] * delayFactor);
      console.log(msg2[x2]);
      x2 += 1;
    }

    sleep(7.54 * remainFactor);
    clearTrm();
    console.log(_here);
    liveType(msg3, 0.1167 * delayFactor, 8.515 * remainFactor);
    clearTrm();
    console.log(_here);
    console.log(msg4);
    console.log(_here * 2);
    sleep(4);
    clearTrm();
  } catch (e) {
    if (e instanceof KeyboardInterrupt) {
      clearTrm();
      console.log(_here);
      console.log(END + LIGHT_GREEN + "Switch!");
      sleep(0.6 * remainFactor);
      clearTrm();
      console.log(_here);
      console.log("Switch!\n\t\tApoc!");
      sleep(1.2 * remainFactor);
      clearTrm();
      console.log(_here);
      console.log(exitMsg);
      sleep(0.9 * remainFactor);
      clearTrm();
      console.log(_here);
      console.log(exitMsg2);
      sleep(0.6 * remainFactor);
      clearTrm();
      console.log(_here);
      liveType(exitMsg, 0.045 * delayFactor, 3.5 * remainFactor);
      console.log(CURSORON + END);
      clearTrm();
      exit();
    } else {
      throw e;
    }
  }

  console.log(CURSORON + END);
  new ClearTrm();
}
