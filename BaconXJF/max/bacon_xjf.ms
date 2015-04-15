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
