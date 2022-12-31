from litemapy import Schematic, Region, BlockState
import numpy as np
import sys

# Shortcut to create a schematic with a single region
"""reg = Region(0, 0, 0, 21, 21, 21)
schem = reg.as_schematic(name="Planet", author="SmylerMC", description="Made with litemapy")

# Create the block state we are going to use
block = BlockState("minecraft:light_blue_concrete")

# Build the planet
for x, y, z in reg.allblockpos():
    if round(((x-10)**2 + (y-10)**2 + (z-10)**2)**.5) <= 10:
        reg.setblock(x, y, z, block)

# Save the schematic
schem.save("planet.litematic")"""

# Load the schematic and get its first region
schem = Schematic.load("WorldEaterTiler/NOCART_WorldEaterDuperSegment.litematic")
region = list(schem.regions.values())[0]

tileDir = input("What axis would you like to tile in (+x, -x, +y, -y, +z, -z)?: ").lower()
tileAmount = int(input("How many times do you want to tile this section?: "))

dirDict = {"+x": [region.maxx() - region.minx() + 1,0,0], "-x": [-(region.maxx() - region.minx()) - 1,0,0],
            "+y": [0,region.maxy() - region.miny() + 1,0], "-y": [0,-(region.maxy() - region.miny() - 1),0],
            "+z": [0,0,region.maxz() - region.minz() + 1], "-z": [0,0,-(region.maxz() - region.minz() - 1)]}

stepSize = np.array(dirDict[tileDir])

#print(stepSize)
baseDimensions = np.array([region.maxx() - region.minx() + 1, region.maxy() - region.miny() + 1, region.maxz() - region.minz() + 1])
print("base dimensions: ", baseDimensions)
print("step size: ", stepSize)
blocksOrder = []
blocksPos = np.empty(int(0), dtype=int)

for pos in region.allblockpos():
    blocksOrder.append(region.getblock(pos[0], pos[1], pos[2]))
    blocksPos = np.append(blocksPos, [pos[0], pos[1], pos[2]])

# make list of positions
blocksPos = np.reshape(blocksPos, (int(len(blocksPos) / 3), 3))

tilerOrder = blocksOrder
tilerPos = blocksPos

for i in range(tileAmount):
    blocksOrder = np.concatenate((blocksOrder, tilerOrder), axis = 0)
    blocksPos = np.concatenate((blocksPos, tilerPos + i * stepSize.reshape((1,3))), axis = 0)

size = baseDimensions + stepSize * (tileAmount - 1)
print("tiled size: ", size)
tiledRegion = Region(0, 0, 0, size[0], size[1], size[2])

b = BlockState("minecraft:red_concrete")

print(len(blocksOrder))
print(blocksPos)

for i in range(len(blocksOrder)):
    blockPos = blocksPos[i]
    blockType = blocksOrder[i]
    #print(type(blockPos[0]), type(blockPos[1]), type(blockPos[2]), type(blockType))
    tiledRegion.setblock(blockPos[0], blockPos[1], blockPos[2], b)

schem = tiledRegion.as_schematic(name="TiledThingy", author="slick#1474", description="Made with suffering")
schem.save("tiledthingy.litematic")