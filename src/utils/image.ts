export async function convertToPng(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("PNG 변환 실패"));
            return;
          }
          // 원래 이름에서 확장자 제거 후 .png 붙임
          const newFile = new File([blob], file.name.replace(/\.[^.]+$/, "") + ".png", {
            type: "image/png",
          });
          resolve(newFile);
        },
        "image/png",
        1,
      );
    };

    reader.readAsDataURL(file);
  });
}
