export const isCodePenURL = (codepenURL: string): boolean => {
  const splittedUrl = codepenURL.split("/");

  if (!codepenURL) {
    return false;
  }

  const {
    [splittedUrl.length - 1]: codepenId,
    [splittedUrl.length - 3]: codepenUserName,
  } = splittedUrl;

  if (!codepenId || !codepenUserName) {
    return false;
  }

  if (codepenURL.startsWith("http")) {
    if (
      codepenURL.split("//")[1].startsWith("codepen.io") ||
      codepenURL.split("//")[1].startsWith("www.codepen.io")
    ) {
      return true;
    }
  } else if (codepenURL.startsWith("www")) {
    if (codepenURL.split(".")[1].startsWith("codepen")) {
      return true;
    }
  } else if (codepenURL.startsWith("codepen.io")) {
    return true;
  }

  return false;
};
