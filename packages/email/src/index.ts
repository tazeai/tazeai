import { Resend } from 'resend';
import { envs } from './envs';

export const resend = new Resend(envs().RESEND_TOKEN);
