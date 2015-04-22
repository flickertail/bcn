/*
The MIT License (MIT)
Copyright (c) 2015 Aaron Bergstrom
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

BaconXJF Java Script Wrap Loader
Author: Aaron Bergstrom 
E-mail: flickertail@gmail.com

*/

function processVizorScene(data)
{
	var vizorContent = JSON.stringify(data); 
	var jFileName = data.id;
	var jfArr = jFileName.split("_");
	jFileName = "";
	var zipName = "";
	for(var i=0; i<jfArr.length; i++)
	{
		jFileName = jFileName + jfArr[i];
		if     (i<(jfArr.length-2)) jFileName = jFileName + "_";
		else if(i<(jfArr.length-1)) jFileName = jFileName + ".";
	}

	jfArr[jfArr.length-1] = "zip";
	for(var i=0; i<jfArr.length; i++)
	{
		zipName = zipName + jfArr[i];
		if     (i<(jfArr.length-2)) zipName = zipName + "_";
		else if(i<(jfArr.length-1)) zipName = zipName + ".";
	}

	var zip = new JSZip();
	zip.file(jFileName, vizorContent);

	//Test Canvas Save
	var savable = new Image();
	var canvas = document.getElementById("icanvas");
	var ctx = canvas.getContext("2d");
	paintVizorMeshImage(ctx);
	savable.src = canvas.toDataURL();
		//	var img = zip.folder("images");
		//	img.file("squares.png", savable.src.substr(savable.src.indexOf(',')+1), {base64: true});
	zip.file("squares.png", savable.src.substr(savable.src.indexOf(',')+1), {base64: true});

	var content = zip.generate({type:"blob"});

	// see FileSaver.js
	saveAs(content, zipName);
}

function loadVizorMeshFile(data)
{
	meshData[data.idx] = data;
//	var meshContent = JSON.stringify(data);
//	document.getElementById('mesharea').innerHTML = meshContent;

}

function readVizorMeshImage(data)
{
}

/* FILL CANVAS WITH IMAGE DATA */
function pngCanvasDraw(ctx, x, y, w, h, c) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.strokeStyle = c;
	ctx.stroke();
}

function paintVizorMeshImage(ctx)
{
	pngCanvasDraw(ctx, 0, 0, 32, 32, "black");
	pngCanvasDraw(ctx, 4, 4, 16, 16, "red");
	pngCanvasDraw(ctx, 8, 8, 16, 16, "green");
	pngCanvasDraw(ctx, 12, 12, 16, 16, "blue");
}

function storeVizorSceneFile(data)
{
}

function storeVizorMeshImage(img)
{
}