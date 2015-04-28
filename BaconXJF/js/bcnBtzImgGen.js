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

BaconXJF Java Script float array to PNG Converter
Author: Aaron Bergstrom 
E-mail: flickertail@gmail.com

*/

/***********************************************************************************************
	The checkLittleEnd function checks to see if the
	platform on which this javascript is running is
	Little Endian. This function was taken from the 
	following webpage:
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView
************************************************************************************************/
function checkLittleEnd()
{
	var buffer = new ArrayBuffer(2);
	new DataView(buffer).setInt16(0, 256, true);
	return new Int16Array(buffer)[0] === 256;
}

//This was ported from the python code for
//the Vizor exporter for Blender
function median_factor(n)
{
	var  fact = [1,n];
	var check = 2;
	var rootn = Math.sqrt(n);

	while(check < rootn)
	{
		if((n%check) == 0)
		{
			fact[fact.length] = check;
			fact[fact.length] = n/check;
		}
		check += 1;
	}

	if(rootn == check) fact[fact.length] = check;
				 fact.sort(function(a, b){return a-b});
	return		 fact[Math.floor(fact.length / 2)];
}

//Takes a Javascript Number array, turns it into
//a Float32Array, and then writes that array
//to a grayscale PNG Image.
function createFloat32PNG(dataArray)
{
	//Canvas to do our rendering
	var canvas = document.createElement("canvas");

	//Figure out how many pixels there will be in the image
	var pixel_count = dataArray.length * 4;
	
	//Determine Height and Width
	var width       = median_factor(pixel_count);
	var height      = pixel_count / width;

	//Create a new image.
	var img = new Image();

	//Set the height and width of the canvas and image.
	    img.width  = width;
	    img.height = height;
	 canvas.width  = width;
	 canvas.height = height;

	//Prepare the canvas for painting
	var ctx = canvas.getContext('2d');
	    ctx.imageSmoothingEnabled = false;
	    ctx.webkitImageSmoothingEnabled = false;
	    ctx.globalCompositeOperation = 'copy';
	    ctx.globalAlpha = 1.0;

	//Convert the float array into a Uint8ClampedArray,
	//I'm assumin that this is a static cast
	var floatArray = new Float32Array(dataArray.length);
	for (var i = 0; i < dataArray.length; i++) floatArray[i] = dataArray[i];
	var fltByte = new Uint8ClampedArray(floatArray.buffer);

	var grayScalePixelCount = pixel_count * 4;
	var imgAB = new ArrayBuffer(grayScalePixelCount);
	var imgByByte = new Uint8ClampedArray(imgAB);

	//Determine if this is a big or little endian platform
	var isLittle = checkLittleEnd();

	//Create a Uint8Clamped Array that spreads the bytes of
	//each float value accross 4 pixels to keep grayscale
      //image.
	var j = 0;
	if(isLittle == true)
	{
		for(var i=0; i<pixel_count; i+=4)
		{
			for(var k=0; k<4; k++)
			{
				imgByByte[j  ] = fltByte[i+(3-k)];
				imgByByte[j+1] = fltByte[i+(3-k)];
				imgByByte[j+2] = fltByte[i+(3-k)];
				imgByByte[j+3] = 255;
				j+=4;
			}
		}
	}
	else
	{
		for(var i=0; i<pixel_count; i++)
		{
			imgByByte[j  ] = fltByte[i];
			imgByByte[j+1] = fltByte[i];
			imgByByte[j+2] = fltByte[i];
			imgByByte[j+3] = 255;
			j+=4;
		}
	}

	//Write data to canvas.	
	var imgData = new ImageData(imgByByte, width, height);
	ctx.putImageData(imgData,0,0); //,0,0,width, height);

	//Write canvas data to img.	
	img.src = canvas.toDataURL('image/png');
	return img;
}