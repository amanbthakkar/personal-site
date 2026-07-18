import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';

import { VIEWS } from './viewCopy';

function ViewToggle({ activeId, onChange }) {
  const power = VIEWS.filter((v) => v.group === 'power');
  const other = VIEWS.filter((v) => v.group === 'other');

  const renderGroup = (views) => (
    <ButtonGroup className='indicator-toggle-group flex-wrap'>
      {views.map((v) => (
        <Button
          key={v.id}
          size='sm'
          variant={activeId === v.id ? 'primary' : 'outline-secondary'}
          onClick={() => onChange(v.id)}
          type='button'
        >
          {v.label}
        </Button>
      ))}
    </ButtonGroup>
  );

  return (
    <div className='indicator-toggles mb-3'>
      <div className='mb-2'>{renderGroup(power)}</div>
      <div>{renderGroup(other)}</div>
    </div>
  );
}

ViewToggle.propTypes = {
  activeId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ViewToggle;
