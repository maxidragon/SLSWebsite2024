import { Injectable } from '@nestjs/common';

const WCA_ORIGIN =
  process.env.WCA_ORIGIN || 'https://www.worldcubeassociation.org';

@Injectable()
export class WcaService {
  async getPublicWcif(competitionId: string) {
    const response = await fetch(
      `${WCA_ORIGIN}/api/v0/competitions/${competitionId}/wcif/public`,
    );
    return await response.json();
  }
}
