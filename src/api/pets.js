import instance from "./index";

const getPets = async () => {
  const pets = await instance.get("pets");
  return pets.data;
};
const addPet = async (name, type, image, adopted) => {
  const res = await instance.post("pets", {
    name: name,
    adopted: adopted,
    type: type,
    image: image,
  });
  return res;
};
const updatePet = async (petId, name, type, image, adopted) => {
  await instance.put(`pets/${petId}`, {
    name: name,
    adopted: 1,
    type: type,
    image: image,
  });
};
const getPetByid = async (petId) => {
  const res = await instance.get(`pets/${petId}`);
  return res.data;
};
const removePet = async (petId) => {
  const res = await instance.delete(`pets/${petId}`);
  return res.data;
};
export { getPets, addPet, updatePet, getPetByid, removePet };
