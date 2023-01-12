import { useState, useMemo } from 'react';
import axios, { AxiosResponse } from 'axios';

import * as Dialog from '@radix-ui/react-dialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { TrashSimple, PencilSimple } from "phosphor-react";

export interface Patient {
  id: string;
  name: string;
  birthDate: string;
  email: string;
  address: string;
}

interface Props {
  setSelectedPatient: React.Dispatch<React.SetStateAction<string>>;
}

export function Patients({ setSelectedPatient }: Props) {
  const [patients, setPatients] = useState<Patient[]>([])

  useMemo(() => {
    async function retrievePatients() {
      try {
        const response: AxiosResponse<{ Items: Patient[] }> = await axios.get('https://9lh25vpnzh.execute-api.us-east-1.amazonaws.com/patients');
        setPatients(response.data.Items);
      } catch (err) {
        console.error(err);
      }
    }

    retrievePatients()
  }, [patients])

  async function deletePatient(id: string) {
    try {
      if (window.confirm("Delete the item?")) {
        await axios.delete(`https://9lh25vpnzh.execute-api.us-east-1.amazonaws.com/patients/${id}`);
        alert('Patient deleted successfully!');
        setSelectedPatient("");
      }
    } catch (err) {
      console.log(err);
      alert('Error deleting patient!');
    }
  }

  return (
    <section className="flex z-0 h-full w-full items-start justify-center relative p-4" data-testid="list">
      <div className="rounded-md overflow-hidden w-full">
        <TableContainer component={Paper} sx={{ height: 550 }}>
          <Table sx={{ height: 'max-content' }} aria-label="simple table">
            <TableHead style={{ position: "sticky", top: 0, zIndex: 1 }} >
              <TableRow className="bg-blue-900 font-semibold">
                <TableCell style={{ color: "white", width: 300 }} align="center">Nome</TableCell>
                <TableCell style={{ color: "white" }} align="center">Data de Nascimento</TableCell>
                <TableCell style={{ color: "white", width: 300 }} align="center">E-mail</TableCell>
                <TableCell style={{ color: "white", width: 350 }} align="center">Endereço</TableCell>
                <TableCell style={{ color: "white", width: 100 }} align="center">Operações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ overflowY: "scroll", height: 100, zIndex: 0 }} id="table">
              {patients.map((patient) => (
                <TableRow key={patient.id} className="flex hover:bg-blue-200 transition-colors duration-400">
                  <TableCell style={{ margin: "0px 16px" }} align="center">{patient.name}</TableCell>
                  <TableCell align="center">
                    {patient.birthDate.split('T')[0].split('-').join('/')}
                  </TableCell>
                  <TableCell align="center">{patient.email}</TableCell>
                  <TableCell align="center">{patient.address}</TableCell>
                  <TableCell align="center" style={{ display: 'grid', gap: 8 }}>
                    <Dialog.Trigger asChild onClick={() => setSelectedPatient(patient.id)}>
                      <Button
                        variant="outlined"
                        startIcon={<PencilSimple size={12} />}
                        style={{ width: '100%', fontSize: 8 }}

                      >
                        Editar
                      </Button>
                    </Dialog.Trigger>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<TrashSimple size={12} />}
                      style={{ width: '100%', fontSize: 8 }}
                      onClick={() => deletePatient(patient.id)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  )
}