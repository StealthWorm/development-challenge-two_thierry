import * as Dialog from '@radix-ui/react-dialog';
import { v4 as uuidv4 } from 'uuid';

import axios from "axios";
import { useState, FormEvent, useEffect } from 'react';

import { Patient } from '../Patients/Patients';
import { Check } from "phosphor-react";
import { useForm, FieldValues } from "react-hook-form";

interface Props {
  currentPatientId: string;
}

export function PatientModal({ currentPatientId }: Props) {
  const [patient, setPatient] = useState<Patient | null>()
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      birthDate: "",
    }
  });
  const onSubmit = handleSubmit((data, e: any) => handleAddPatient(data, e));

  useEffect(() => {
    if (currentPatientId !== "") {
      handleReset();
      handleSetPatient(currentPatientId)
    }
  }, [currentPatientId])

  useEffect(() => {
    setValue("name", patient ? patient.name : "")
    setValue("email", patient ? patient.email : "")
    setValue("address", patient ? patient.address : "")
    setValue("birthDate", patient ? patient.birthDate : "")
  }, [patient])

  async function handleAddPatient(data: FieldValues, event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const values = Object.fromEntries(formData);
    data = values;

    try {
      if (!currentPatientId) {
        await axios.post('https://9lh25vpnzh.execute-api.us-east-1.amazonaws.com/patients', {
          id: uuidv4(),
          name: String(values.name),
          address: String(values.address),
          email: String(values.email),
          birthDate: String(values.birthDate),
        })
        alert('Paciente criado com sucesso!')
        handleReset();
      } else {
        await axios.put(`https://9lh25vpnzh.execute-api.us-east-1.amazonaws.com/patients/${currentPatientId}`, {
          name: String(values.name),
          address: String(values.address),
          email: String(values.email),
          birthDate: String(values.birthDate),
        })
        alert('Paciente atualizado com sucesso!')
        handleReset();
      }
    } catch (err) {
      console.log(err)
      alert('Erro no processo!')
    }

    window.location.reload();
  }

  async function handleSetPatient(id: string) {
    try {
      await axios(`https://9lh25vpnzh.execute-api.us-east-1.amazonaws.com/patients/${id}`)
        .then(response => {
          setPatient(response.data.Item)
        })
    } catch (err: any) {
      console.log(err)
    }
  }

  function handleReset() {
    setPatient(null)
    reset()
  }

  return (
    <div data-testid="form">
      <Dialog.Portal data-testid="form">
        <Dialog.Overlay className="bg-gradient-to-b from-black/60 to-violet-900/60 inset-0 fixed" />
        <Dialog.Content onInteractOutside={(e) => e.preventDefault()} className="absolute z-1 bg-[#2A2634]/80 backdrop-blur-md  py-8 px-10 text-white shadow-xl shadow-violet-800/80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px]">
          <Dialog.Title className="text-3xl font-black">{patient ? `Editando ${patient.name}` : "Cadastro de novo paciente"}</Dialog.Title>

          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                  className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 ${errors.name ? "outline-none border border-red-500" : ""}`}
                  id="name"
                  data-testid="name-input"
                  placeholder="John Doe"
                  type="text"
                  {...register("name", {
                    required: true,
                    pattern: {
                      value: /[A-Za-z]/,
                      message: "Somente letras"
                    },
                  })}
                />
                {errors?.name && <span className="text-[12px] text-red-500 -mt-1">Name is required</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="birthDate">Birth Date</label>
                <input
                  className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 ${errors.birthDate ? "outline-none border border-red-500" : ""}`}
                  id="birthDate"
                  data-testid="birthdate-input"
                  placeholder="dd/mm/yyyy"
                  type="text"
                  {...register('birthDate', {
                    required: true,
                    pattern: {
                      value: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/,
                      message: 'Please enter a valid date',
                    },
                  })}
                />
                {errors?.birthDate && <span className="text-[12px] text-red-500 -mt-1">Birth Date is required</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 ${errors.email ? "outline-none border border-red-500" : ""}`}
                  id="email"
                  data-testid="email-input"
                  type="email"
                  placeholder="email"
                  {...register('email', {
                    required: true,
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please enter a valid email',
                    },
                  })}
                />
                {errors?.email && <span className="text-[12px] text-red-500 -mt-1">Email is required</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="address">Address</label>
                <input
                  className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 ${errors.address ? "outline-none border border-red-500" : ""} `}
                  id="address"
                  data-testid="address-input"
                  type="text"
                  placeholder="address"
                  {...register('address', {
                    required: true,
                  })}
                />
                {errors?.address && <span className="text-[12px] text-red-500 -mt-1">Address is required</span>}
              </div>
            </div>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors" onClick={() => handleReset()}>
                Cancel
              </Dialog.Close>
              <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600  transition-colors">
                <Check size={24} />
                CONFIRM
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </div>
  )
}