bpy.ops.mesh.primitive_cube_add(size=1, location=location)
wall = bpy.context.object    wall.scale = (width, depth, height)
wall.name = "Wall"
return wall# Function to create a floordef create_floor(width, depth, location):
bpy.ops.mesh.primitive_plane_add(size=1, location=location)
floor = bpy.context.object    floor.scale = (width, depth, 1)
floor.name = "Floor"
return floor# Function to create a windowdef create_window(width, height, location):
bpy.ops.mesh.primitive_cube_add(size=1, location=location)
window = bpy.context.object    window.scale = (width, 0.1, height)  # Thin cube for window    window.name = "Window"
return window# Function to create a doordef create_door(width, height, depth, location):
bpy.ops.mesh.primitive_cube_add(size=1, location=location)
door = bpy.context.object    door.scale = (width, depth, height)
door.name = "Door"
return door# Function to create a roofdef create_roof(width, depth, height, location):
bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=max(width, depth)/2, depth=height, location=location)
roof = bpy.context.object    roof.rotation_euler = (0, 0, math.radians(45))  # Rotate to align with building    roof.name = "Roof"
return roof# Function to create a staircasedef create_staircase(width, height, depth, location):
step_height = height / 10    for i in range(10):
    step_location = (location[0], location[1], location[2] + i * step_height)
    bpy.ops.mesh.primitive_cube_add(size=1, location=step_location)
    step = bpy.context.object        step.scale = (width, depth, step_height)
    step.name = f"Step_{i+1}"
return bpy.context.object# Function to create a simple box characterdef create_box_character(location):
bpy.ops.mesh.primitive_cube_add(size=1, location=location)
character = bpy.context.object    character.scale = (0.5, 0.5, 1.5)  # Make it taller    character.name = "BoxCharacter"

# Add simple animations (move and jump)
character.keyframe_insert(data_path="location", frame=1)
character.location.x += 2    character.keyframe_insert(data_path="location", frame=30)
character.location.z += 2    character.keyframe_insert(data_path="location", frame=60)
character.location.x -= 2    character.keyframe_insert(data_path="location", frame=90)
character.location.z -= 2    character.keyframe_insert(data_path="location", frame=120)

return character# Main function to create a buildingdef create_building(width, depth, height, num_floors):
# Create floors    for i in range(num_floors):
    floor_location = (0, 0, i * height)
    create_floor(width, depth, floor_location)

wall_thickness = 0.2    wall_height = height * num_floors    create_wall(width, wall_height, wall_thickness, (0, -depth/2, wall_height/2))  # Front wall    create_wall(width, wall_height, wall_thickness, (0, depth/2, wall_height/2))   # Back wall    create_wall(depth, wall_height, wall_thickness, (-width/2, 0, wall_height/2))  # Left wall    create_wall(depth, wall_height, wall_thickness, (width/2, 0, wall_height/2))   # Right wall    
window_width = 1.5    window_height = 1.2    door_width = 1.0    door_height = 2.0    create_window(window_width, window_height, (0, -depth/2 + wall_thickness, 1.5))  # Front window    create_door(door_width, door_height, wall_thickness, (0, -depth/2 + wall_thickness, door_height/2))  # Front door    
roof_height = 2.0    create_roof(width, depth, roof_height, (0, 0, wall_height + roof_height/2))

staircase_width = 1.0    staircase_depth = 1.0    create_staircase(staircase_width, height, staircase_depth, (width/2 + 1, 0, 0))
Example usagecreate_building(10, 8, 3, 2) # Create a 10x8 building with 2 floorscreate_box_character((5, 5, 1.5)) # Create a box character at (5, 5, 1.5)
