import React, { useEffect, useState } from "react";
import petsData from "../petsData";
import { useParams } from "react-router-dom";
import { getPetByid, removePet, updatePet } from "../api/pets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const PetDetail = () => {
  const { petId } = useParams();
  const { data: pet } = useQuery({
    queryKey: ["pet", petId],
    queryFn: () => getPetByid(petId),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      updatePet(pet.id, pet.name, pet.image, pet.type, pet.adopted),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pet"] });
    },
  });

  const handelUpdate = () => {
    mutation.mutate();
  };

  const { mutate: Removepet } = useMutation({
    mutationFn: () => removePet(petId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pet"] });
    },
  });
  const handelRemove = () => {
    Removepet();
  };
  if (!pet) return <h1>There is no pet with the id: ${petId}</h1>;
  return (
    <div className="bg-[#F9E3BE] w-screen h-[100vh] flex justify-center items-center">
      <div className="border border-black rounded-md w-[70%] h-[70%] overflow-hidden flex flex-col md:flex-row p-5">
        <div className="h-full w-full md:w-[35%]">
          <img
            src={pet.image}
            alt={pet.name}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-full md:w-[65%] h-full pt-[30px] flex flex-col p-3">
          <h1>Name: {pet.name}</h1>
          <h1>Type: {pet.type}</h1>
          <h1>adopted: {pet.adopted}</h1>

          <button
            onClick={handelUpdate}
            className="w-[70px] border border-black rounded-md  hover:bg-green-400 mb-5"
          >
            Adobt
          </button>

          <button
            on
            onClick={handelRemove}
            className="w-[70px] border border-black rounded-md  hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
