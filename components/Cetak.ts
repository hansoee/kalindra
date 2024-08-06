import { getDocument, GlobalWorkerOptions, version } from "pdfjs-dist";
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.js`;
var input = document.getElementById("file") as HTMLInputElement;
input.addEventListener("change", async () => {
  if (input.files!.length === 1) {
    var file = input.files![0];
    var pdf = await getDocument(await file.arrayBuffer()).promise;
    var page = await pdf.getPage(1);
    var viewport = page.getViewport({ scale: 1 });
    var canvas = document.getElementById("pdf-canvas") as HTMLCanvasElement;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    page.render({
      canvasContext: canvas.getContext("2d")!,
      viewport: viewport
    });
    console.log("Rendered");
  }
});
