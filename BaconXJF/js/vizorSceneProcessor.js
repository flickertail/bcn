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

	//Waiting for mesh data to load
	var timeOut = 0;
	while(mdLenFnd < mdLen && timeOut < 100000) timeOut++;

	if(timeOut>= 100000)
	{
		alert("Vizor Scene Processor timed out while\nwhile waiting for mesh data to load.");
		return;
	}

	for(var i=0; i<mdLen; i++)
	{
		var mesh = meshData[i];
		
		//Create Vertex PNG file and add it to the ZIP file.
		var vertImage = createFloat32PNG(mesh.vertices);
		zip.file((mesh.meshname + "_v" + mesh.idx + ".png"), vertImage.src.substr(vertImage.src.indexOf(',')+1), {base64: true});

		//Create Normals PNG file and add it to the ZIP file.
		var normImage = createFloat32PNG(mesh.normals);
		zip.file((mesh.meshname + "_n" + mesh.idx + ".png"), normImage.src.substr(normImage.src.indexOf(',')+1), {base64: true});

		//Create multiple uv map PNG files and add them to the ZIP file.
		for(var j=0; j<mesh.uvMaps.length; j++)
		{
			var uvmap   = mesh.uvMaps[j];
			var uvImage = createFloat32PNG(uvmap.uvcoords);
			zip.file((mesh.meshname + "_t" + j + ".png"), uvImage.src.substr(uvImage.src.indexOf(',')+1), {base64: true});
		}
	}

	var content = zip.generate({type:"blob"});

	// see FileSaver.js
	saveAs(content, zipName);
}

function loadVizorMeshFile(data)
{
	meshData[data.idx] = data;
	mdLenFnd++;
}

function readVizorMeshImage(data)
{
}

function storeVizorSceneFile(data)
{
}

function storeVizorMeshImage(img)
{
}