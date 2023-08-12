import React from 'react';
import { useSelector } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { RootState } from 'services/store';
import ObjectiveInformations from './ObjectiveInformations';
import ObjectiveProgress from './ObjectiveProgress';
import ObjectiveStats from './ObjectiveStats';

const ProjectPane = ({
  defaultTab,
  id,
}) => {
  const objectives = useSelector((state: RootState) => state.objectives);
  const objective = (objectives || []).find(o => o.id === id);

  return (
    <>
      <h4>{ objective?.name }</h4>
      <Tabs
        className="mb-3"
        defaultActiveKey={defaultTab}
      >
        {
          objective?.id && (
            <Tab
              eventKey="stats"
              title="Statistiques"
            >
              <ObjectiveStats
                objective={objective}
              />
            </Tab>
          )
        }
        {
          objective?.id && (
            <Tab
              eventKey="progress"
              title="Progrès"
            >
              <ObjectiveProgress
                objective={objective}
              />
            </Tab>
          )
        }
        <Tab
          eventKey="infos"
          title="Informations"
        >
          <ObjectiveInformations
            objective={objective}
          />
        </Tab>
      </Tabs>
    </>
  );
};

export default ProjectPane;
