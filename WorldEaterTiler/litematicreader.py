from nbt.nbt import *

from nbt import nbt



nbtfile = nbt.NBTFile("WorldEaterTiler/test.litematic",'rb')
print(nbtfile.pretty_tree())
metadata = nbtfile["Metadata"]
size  = [metadata["EnclosingSize"][i].value for i in range(3)]
print(type(metadata["EnclosingSize"]))


for thing in nbtfile["Regions"]:
    #print(thing)
    pass
"""print(nbtfile["nested compound test"].tag_info())

for tag in nbtfile["nested compound test"]["ham"].tags:
    print(tag.tag_info())
print(TAG_String("name"))
print(TAG_Float("value"))
print([tag.value for tag in nbtfile["listTest (long)"].value])"""