import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

import { Header } from '../components/Header/Header';
import { UserPlus } from 'phosphor-react';
import { Patients } from '../components/Patients/Patients';
import { PatientModal } from '../components/PatientModal/PatientModal';

import logo from '../assets/logo.svg'

export function PatientsScreen() {
  const [selectedPatient, setSelectedPatient] = useState("");

  return (
    <div className="flex flex-col items-start h-screen">
      <Header />

      <div className="flex flex-row h-full relative w-full">
        <Dialog.Root>
          <aside className="flex bg-[#002137] relative overflow-hidden">
            <img src={logo} className="flex opacity-5 absolute bottom-[-5rem] left-[-5rem] w-[100rem]"></img>
            <ul className="flex flex-col w-[15rem] items-center">
              <Dialog.Trigger className="flex w-full py-2 hover:bg-blue-400 transition-colors">
                <li className="flex w-full text-slate-50 items-center justify-center px-3">
                  <div className="flex items-center gap-2">
                    <UserPlus />
                    Adicionar Paciente
                  </div>
                </li>
              </Dialog.Trigger>
            </ul>
          </aside>
          <PatientModal currentPatientId={selectedPatient} />
          <Patients setSelectedPatient={setSelectedPatient} />
        </Dialog.Root>
      </div>
    </div >
  )
}

