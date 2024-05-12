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

export function stringToFile(fileContents: string[] | undefined): File[] {
  if (!fileContents) return [];

  return fileContents.map((content, index) => {
    {
      const base64Data = content.split(",")[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/octet-stream" });

      const fileName = `imagem_${index + 1}.bin`;
      const file = new File([blob], fileName, {
        type: "application/octet-stream",
      });

      return file;
    }
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

export function zipCodeToInt(zip: string | undefined): number | undefined {
  if (!zip) return undefined;

  const zipCodeNumber = parseInt(zip.replace(/[^0-9]/g, ""));
  return zipCodeNumber === 0 ? undefined : zipCodeNumber;
}

export function removeCurrencySymbolAndParse(value: string): number {
  // Remove non-digit characters
  const cleanedValue = value.replace(/[^\d,.-]/g, "");
  // Replace dot separator with empty string
  const numberValue = cleanedValue.replace(/\./g, "");
  // Replace comma separator with dot
  const dotValue = numberValue.replace(/,/g, ".");
  return parseFloat(dotValue) || 0;
}
