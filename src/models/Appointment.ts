import { v4 as uuid_v4 } from 'uuid';

class Appointment {
  id: string;

  provider_id: string;

  date: Date;

  constructor({ provider_id, date }: Omit<Appointment, 'id'>) {
    this.id = uuid_v4();
    this.provider_id = provider_id;
    this.date = date;
  }
}

export default Appointment;
