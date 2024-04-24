function readFile(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function getBase64(file: File): Promise<string> {
  try {
    const base64String = await readFile(file);
    return base64String;
  } catch (error) {
    console.error("Error reading file:", error);
    return "";
  }
}
