import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useTranslation } from 'react-i18next';
import { useGetObjectivesQuery } from 'services/objectives/api';
import ObjectiveHistory from './ObjectiveHistory';
import ObjectiveInformations from './ObjectiveInformations';
import ObjectiveProgress from './ObjectiveProgress';
import ObjectiveStats from './ObjectiveStats';

const ObjectivePane = ({
  defaultTab,
  id,
}) => {
  const { t } = useTranslation();

  const { data: objectives } = useGetObjectivesQuery();
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
              eventKey="STATS"
              title={t('stats')}
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
              eventKey="PROGRESS"
              title={t('progress')}
            >
              <ObjectiveProgress
                objective={objective}
              />
            </Tab>
          )
        }
        <Tab
          eventKey="INFOS"
          title={t('informations')}
        >
          <ObjectiveInformations
            objective={objective}
          />
        </Tab>
        <Tab
          eventKey="HISTORY"
          title={t('history')}
        >
          {
            objective && (
              <ObjectiveHistory
                objective={objective}
              />
            )
          }
        </Tab>
      </Tabs>
    </>
  );
};

export default ObjectivePane;
