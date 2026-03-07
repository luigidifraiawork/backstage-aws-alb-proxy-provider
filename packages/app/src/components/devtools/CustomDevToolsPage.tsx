import {
  ConfigContent,
  ExternalDependenciesContent,
  InfoContent,
  ScheduledTasksContent,
} from '@backstage/plugin-devtools';
import { DevToolsLayout } from '@backstage/plugin-devtools';

import { configApiRef, useApi } from '@backstage/core-plugin-api';
import { Navigate } from 'react-router-dom';

export const DevToolsPage = () => {
  const configApi = useApi(configApiRef);
  const enabled = configApi.getOptionalBoolean('devtools.enabled') ?? false;

  if (!enabled) {
    return <Navigate to="/" replace />;
  }

  return (
    <DevToolsLayout>
      <DevToolsLayout.Route path="info" title="Info">
        <InfoContent />
      </DevToolsLayout.Route>
      <DevToolsLayout.Route path="config" title="Config">
        <ConfigContent />
      </DevToolsLayout.Route>
      <DevToolsLayout.Route path="scheduled-tasks" title="Scheduled Tasks">
        <ScheduledTasksContent />
      </DevToolsLayout.Route>
      <DevToolsLayout.Route
        path="external-dependencies"
        title="External Dependencies"
      >
        <ExternalDependenciesContent />
      </DevToolsLayout.Route>
    </DevToolsLayout>
  );
};

export const customDevToolsPage = <DevToolsPage />;
