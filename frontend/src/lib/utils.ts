import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Competition } from "./interfaces";
import { t } from "i18next";
import { WCA_LIVE_ORIGIN, WCA_ORIGIN } from "./request";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isHappeningNow = (startDate: Date, endDate: Date) => {
  const now = new Date();
  return new Date(startDate).getDate() <= now.getDate() && now.getDate() <= new Date(endDate).getDate();
};

export const isPastCheck = (endDate: Date) => {
  const now = new Date();
  return new Date(endDate).getTime() < now.getTime() && new Date(endDate).getDate() !== now.getDate();
};

export const isRegistrationOpenCheck = (registrationOpen: Date, registrationClose: Date) => {
  return new Date(registrationOpen).getTime() < new Date().getTime() && new Date(registrationClose).getTime() > new Date().getTime();
};

export const formatDates = (startDate: Date, endDate: Date) => {
  return startDate === endDate ? new Date(startDate).toLocaleDateString() : `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`;
};

export const magicButtonProperties = (competition: Competition) => {
  const isPast = isPastCheck(competition.endDate);
  const registrationOpen = isRegistrationOpenCheck(competition.registrationOpen, competition.registrationClose);
  const showMagicButton = isPast || registrationOpen || isHappeningNow(competition.startDate, competition.endDate);
  const magicButtonText = isPast ? t('results') : isHappeningNow(competition.startDate, competition.endDate) ? t('liveResults') : t('register');
  const magicButtonLink = isPast ? `${WCA_ORIGIN}/competitions/${competition.wcaId}/results/all` : isHappeningNow(competition.startDate, competition.endDate) ? `${WCA_LIVE_ORIGIN}/link/competitions/${competition.wcaId}` : `${WCA_ORIGIN}/competitions/${competition.wcaId}/register`;
  return { showMagicButton, magicButtonText, magicButtonLink };
};