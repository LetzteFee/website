// Password Generator Lib by Me
// This porject is only for academic purposes only.
// Do not use it in security relevant tasks.

// How to use:
// 1. Create the Object
//  var password_object = new password(
//  doLowercase: boolean,
//  doUppercase: boolean,
//  doNumbers: boolean,
//  doSpecialChars: boolean,
//  length: int,
//  doIncludeEveryType: boolean
//  );
// 2. Call the function to generate the password
//  var password01 = password_object.generatePassword();

class password {
  constructor(
    doLowercase,
    doUppercase,
    doNumbers,
    doSpecialChars,
    length,
    doIncludeEveryType,
    blacklist_chars
  ) {
    this.UppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.LowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    this.Numbers = "0123456789";
    //this.SpecialChars = "!\"§$%&/()=?`+#-.,;:'*{}[]<>|";
    this.SpecialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_'{|}~";

    this.doLowercase = doLowercase;
    this.doUppercase = doUppercase;
    this.doSpecialChars = doSpecialChars;
    this.doNumbers = doNumbers;
    this.pwdLength = length;
    this.doIncludeEveryType = doIncludeEveryType;
    this.blacklist_chars = blacklist_chars;
  }
  buildPassword() {
    //check if password long enough to include all types if doIncludeEveryType is enabled
    if (this.doIncludeEveryType) {
      this.checkPwdAchievability();
    }

    let pl = ""; // Possible Letters
    let psw = "";

    if (this.doLowercase) {
      pl = pl + this.LowercaseLetters;
    }
    if (this.doUppercase) {
      pl = pl + this.UppercaseLetters;
    }
    if (this.doNumbers) {
      pl = pl + this.Numbers;
    }
    if (this.doSpecialChars) {
      pl = pl + this.SpecialChars;
    }

    //remove blacklist characters from possible letters variable
    for (let h = 0; h < this.blacklist_chars.length; h++) {
      pl = removeCharsFromString(pl, this.blacklist_chars[h]);
    }

    //check if blacklist if compatible with doIncludeEveryType
    if (this.doIncludeEveryType && !this.containsSelectedTypes(pl)) {
      doLog("buildPassword()", "blacklist not compatible with doIncludeEveryType", false);
      this.doIncludeEveryType = false;
      doLog("buildPassword()", "disabled this.doIncludeEveryType");
    }

    //build password
    for (let i = 0; i < this.pwdLength; i++) {
      psw = psw + pl[getRandomInt(0, pl.length - 1)];
    }

    // Rekursion ist nicht notwendig, aber ich will sie halt mal einsetzen
    if (this.doIncludeEveryType && !this.containsSelectedTypes(psw)) {
      doLog("buildPassword()", psw + " does not contain every selected type");
      return this.buildPassword();
    }

    doLog("buildPassword()", psw + " is acceptable.");
    return psw;
  }
  containsSelectedTypes(psw) {
    let containsType;

    if (this.doLowercase) {
      containsType = false;

      for (let i = 0; i < this.LowercaseLetters.length; i++) {
        if (psw.includes(this.LowercaseLetters[i])) {
          containsType = true;
          break;
        }
      }
      if (!containsType) {
        return false;
      }
    }

    if (this.doUppercase) {
      containsType = false;

      for (let i = 0; i < this.UppercaseLetters.length; i++) {
        if (psw.includes(this.UppercaseLetters[i])) {
          containsType = true;
          break;
        }
      }
      if (!containsType) {
        return false;
      }
    }

    if (this.doNumbers) {
      containsType = false;

      for (let i = 0; i < this.Numbers.length; i++) {
        if (psw.includes(this.Numbers[i])) {
          containsType = true;
          break;
        }
      }
      if (!containsType) {
        return false;
      }
    }

    if (this.doSpecialChars) {
      containsType = false;

      for (let i = 0; i < this.SpecialChars.length; i++) {
        if (psw.includes(this.SpecialChars[i])) {
          containsType = true;
          break;
        }
      }
      if (!containsType) {
        return false;
      }
    }

    return true;
  }
  checkPwdAchievability() {
    let amount_of_types =
      Number(this.doLowercase) +
      Number(this.doUppercase) +
      Number(this.doSpecialChars) +
      Number(this.doNumbers);
    if (amount_of_types > this.pwdLength) {
      doLog(
        "pwd-gen.lib.js: checkPwdAchievability()",
        "Password length had to be increased from " +
        this.pwdLength +
        " to " +
        amount_of_types
      );
      this.pwdLength = amount_of_types;
    }
  }
}
