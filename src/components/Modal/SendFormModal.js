import React, { useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setSendModalFormStatus } from '../../reducers/modal';

import {
  ModalBackground,
  ModalContainer,
  ModalTitleRow,
  ModalTitle,
  ModalIcon,
  ModalContent,
  ModalContentTitle,
  ModalContentLink,
  ModalContentCaption
} from '../../styles/Modal';

const SendFormModal = ({
  formUid
}) => {
  const linkRef = useRef(null);
  const dispatch = useDispatch();
  const splitUrl = window.location.href.split('/');
  const formViewUrl = `${splitUrl[2]}/viewform/${formUid}`;
  const [isCopied, setIsCopied] = useState(false);

  const onClickLink = () => {
    const target = linkRef.current;
    target.select();
    target.setSelectionRange(0, 99999);

    document.execCommand('copy');
    setIsCopied(true);
  }

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalTitleRow>
          <ModalTitle>
            Send Form
          </ModalTitle>
          <ModalIcon onClick={e => dispatch(setSendModalFormStatus(false))}>
            <MdClose size="24px"/>
          </ModalIcon>
        </ModalTitleRow>
        <ModalContent>
          <ModalContentTitle>
            Copy Link
          </ModalContentTitle>
          <ModalContentLink>
            <input
              ref={linkRef}
              type="text"
              readOnly
              value={formViewUrl}
              onClick={e => onClickLink()}
            />
          </ModalContentLink>
          {
            isCopied &&
            <ModalContentCaption>
              The link has been copied to your clipboard!
            </ModalContentCaption>
          }
        </ModalContent>
      </ModalContainer>
    </ModalBackground>
  )
}

export default SendFormModal;