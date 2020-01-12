import development from './development';
import empty from './empty';
import ENV from '../../config/environment';

export default function(server) {
  const scenarios = {development, empty};
  const activeScenario = ENV.mirageScenario;
  const scenario = scenarios[activeScenario];
  if (scenario) scenario(server);
}
