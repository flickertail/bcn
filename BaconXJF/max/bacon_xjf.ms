-- The MIT License (MIT)
-- 
-- Copyright (c) 2015 Aaron Bergstrom
-- 
-- Permission is hereby granted, free of charge, to any person obtaining a copy
-- of this software and associated documentation files (the "Software"), to deal
-- in the Software without restriction, including without limitation the rights
-- to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
-- copies of the Software, and to permit persons to whom the Software is
-- furnished to do so, subject to the following conditions:
-- 
-- The above copyright notice and this permission notice shall be included in
-- all copies or substantial portions of the Software.
-- 
-- THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
-- IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
-- FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
-- AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
-- LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
-- OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
-- THE SOFTWARE.

-- BaconXJF 
-- Author: Aaron Bergstrom 
-- E-mail: flickertail@gmail.com

rollout eoOptions "Export Options" rolledUp: false
(

)

rollout ioOptions "Import Options" rolledUp: false
(
	
)

utility baconxjf "Bacon XJF" rolledUp: false
( 
	button bxjfEO "Export Options"
	button bxjfIO "Import Opttions"
	on bxjfEO pressed do
	(
		bxjfEOWindow = newRolloutFloater "Bacon XJF - 3D Web Formats" 400 600
		addRollout eoOptions bxjfEOWindow
	)
	on bxjfIO pressed do
	(
		bxjfIOWindow = newRolloutFloater "Bacon XJF - 3D Web Formats" 400 600
		addRollout ioOptions bxjfIOWindow
	)
) 
