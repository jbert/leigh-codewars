// Divide into hours, then remainder into minutes then into seconds

function humanReadable(seconds) {
  let secs = seconds;
  let minutes;
  let hours;
  if (secs > 3600) {
    hours = Math.floor(secs / 3600);
    secs -= hours * 3600;
  }
  if (secs > 60) {
    minutes = Math.floor(secs / 60);
    secs -= minutes * 60;
  }

  if (hours === undefined) {
    hours = 0;
  }

  if (minutes === undefined) {
    minutes = 0;
  }
  // for case where secs = 60, should read mins++
  if (secs === 60) {
    secs = 0;
    minutes++;
  }

  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  // returns number as 2 digit format
  hours = (hours).toLocaleString('en-GB', { minimumIntegerDigits: 2, useGrouping: false });
  minutes = minutes.toLocaleString('en-GB', { minimumIntegerDigits: 2, useGrouping: false });
  secs = secs.toLocaleString('en-GB', { minimumIntegerDigits: 2, useGrouping: false });

  return `${hours}:${minutes}:${secs}`;
}

humanReadable(86399);
// humanReadable(60);

/*
Write a function, which takes a non-negative integer (seconds) as input and returns the time
in a human-readable format (HH:MM:SS)

HH = hours, padded to 2 digits, range: 00 - 99
MM = minutes, padded to 2 digits, range: 00 - 59
SS = seconds, padded to 2 digits, range: 00 - 59
The maximum time never exceeds 359999 (99:59:59)

You can find some examples in the test fixtures.

Test.assertEquals(humanReadable(0), '00:00:00', 'humanReadable(0)');
    Test.assertEquals(humanReadable(5), '00:00:05', 'humanReadable(5)');
    Test.assertEquals(humanReadable(60), '00:01:00', 'humanReadable(60)');
    Test.assertEquals(humanReadable(86399), '23:59:59', 'humanReadable(86399)');
    Test.assertEquals(humanReadable(359999), '99:59:59', 'humanReadable(359999)');
*/
