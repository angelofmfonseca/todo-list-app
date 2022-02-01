import React, { useState, useContext } from 'react';
import { Button } from '../components/atoms/Button';
import { IncrementIcon, TrashBinIcon } from '../assets/Icons';
import Search from '../components/molecules/Search';
import CreateScreen from '../components/organisms/CreateScreen';
import { ModalContext } from '../context/modal-context';
import { SelectedContext } from '../context/selected-item';
import Popup from '../components/molecules/Popup';
import * as S from './styles';

const Template = ({ children, searchFilter }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [, setModal] = useContext(ModalContext);
  const [selectedItem] = useContext(SelectedContext);

  return (
    <S.TemplateWrapper>
      <Search searchFilter={searchFilter} />
      <S.ChildrenWrapper>{children}</S.ChildrenWrapper>
      <S.AddCounterWrapper>
        <S.BottomWrapper isSelectedItem={!!selectedItem}>
          {selectedItem ? (
            <S.OptionsWrapper>
              <Button
                color="white"
                onClick={() =>
                  setModal({
                    title: `Delete the "${selectedItem.title}" counter?`,
                    subtitle: 'This cannot be undone.',
                    isOpen: true
                  })
                }>
                <TrashBinIcon fill="var(--destructive-red)" />
              </Button>
            </S.OptionsWrapper>
          ) : null}
          <Button onClick={() => setIsModalOpened(true)}>
            <IncrementIcon fill="var(--white)" />
          </Button>
        </S.BottomWrapper>
      </S.AddCounterWrapper>
      <CreateScreen isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />
      <Popup />
    </S.TemplateWrapper>
  );
};

export default Template;
