//Copywrite (c) 2015
function processVizorScene(data)
{
	var newContent = JSON.stringify(data); 
	document.getElementById('content').innerHTML = newContent;
}

function loadVizorMeshFile(data)
{
	meshData[data.idx] = data;
	var meshContent = JSON.stringify(data);
	document.getElementById('mesharea').innerHTML = meshContent;
}

function readVizorMeshImage(data)
{
}

function paintVizorMeshImage(data)
{
}

function storeVizorSceneFile(data)
{
}

function storeVizorMeshImage(img)
{
}
