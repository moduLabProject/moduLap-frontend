import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight } from 'lucide-react';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Checkbox } from '../components/ui/Checkbox';
import { SelectBox } from '../components/ui/Selectbox';
import {
  setUserType,
  toggleTerm,
  setAgreement,
  setAllAgreements,
  initialState as signupInitialState,
} from './signupSlice';
import type { RootState } from '../store/index';

type UserType = '일반회원' | '작가' | '소품샵';
type AgreementKey =
  | 'all'
  | 'age'
  | 'terms'
  | 'businessInfo'
  | 'settlement'
  | 'fraud'
  | 'customerData'
  | 'marketing'
  | 'notification';

const USER_TYPES: { value: UserType; label: string }[] = [
  { value: '일반회원', label: '일반회원' },
  { value: '작가', label: '작가' },
  { value: '소품샵', label: '소품샵' },
];

interface TermItem {
  key: AgreementKey;
  label: string;
  hasDetail: boolean;
  showForUserTypes: UserType[];
}

const TERMS: TermItem[] = [
  {
    key: 'age',
    label: '만 14세 이상입니다 (필수)',
    hasDetail: true,
    showForUserTypes: ['일반회원', '작가', '소품샵'],
  },
  {
    key: 'terms',
    label: '이용약관 (필수)',
    hasDetail: true,
    showForUserTypes: ['일반회원', '작가', '소품샵'],
  },
  {
    key: 'businessInfo',
    label: '사업자 정보 확인 및 등록 동의 (필수)',
    hasDetail: true,
    showForUserTypes: ['작가', '소품샵'],
  },
  {
    key: 'settlement',
    label: '정산 및 수수료 정책 동의 (필수)',
    hasDetail: false,
    showForUserTypes: ['작가', '소품샵'],
  },
  {
    key: 'fraud',
    label: '부정거래 방지 및 제재 정책 동의 (필수)',
    hasDetail: true,
    showForUserTypes: ['작가', '소품샵'],
  },
  {
    key: 'customerData',
    label: '고객 리뷰 및 데이터 활용 동의 (선택)',
    hasDetail: false,
    showForUserTypes: ['작가', '소품샵'],
  },
  {
    key: 'marketing',
    label: '개인정보 마케팅 활용동의 (선택)',
    hasDetail: false,
    showForUserTypes: ['일반회원', '작가', '소품샵'],
  },
  {
    key: 'notification',
    label: '이벤트, 쿠폰, 특가 알림 메일 및 sms 등 수신 (선택)',
    hasDetail: false,
    showForUserTypes: ['일반회원', '작가', '소품샵'],
  },
];

const SUBMIT_BUTTON_LABELS: Record<UserType, string> = {
  일반회원: '회원가입하기',
  작가: '작가 등록 신청',
  소품샵: '소품샵 등록 신청',
};

interface LabeledInputProps {
  id?: string;
  label: string;
  type?: 'text' | 'password' | 'email' | 'tel';
  placeholder?: string;
  className?: string;
}

const LabeledInput = ({
  id,
  label,
  type = 'text',
  className = '',
  placeholder,
}: LabeledInputProps) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label htmlFor={id}>{label}</label>
    <Input id={id} type={type} placeholder={placeholder} className="w-full" />
  </div>
);

interface LabeledInputWithButtonProps extends LabeledInputProps {
  buttonLabel: string;
  onButtonClick?: () => void;
}

const LabeledInputWithButton = ({
  id,
  label,
  type = 'text',
  buttonLabel,
  onButtonClick,
  placeholder,
}: LabeledInputWithButtonProps) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id}>{label}</label>
    <div className="flex w-full gap-2">
      <Input id={id} type={type} placeholder={placeholder} className="flex-1" />
      <Button label={buttonLabel} variant="primary" onClick={onButtonClick} />
    </div>
  </div>
);

interface TermItemProps {
  term: TermItem;
  checked: boolean;
  isOpen: boolean;
  onCheck: (isChecked: boolean) => void;
  onToggle: () => void;
}

const TermItemComponent = ({
  term,
  checked,
  isOpen,
  onCheck,
  onToggle,
}: TermItemProps) => (
  <>
    <div className="flex justify-between">
      <Checkbox
        id={`agree-${term.key}`}
        label={term.label}
        checked={checked}
        onChange={onCheck}
      />
      {term.hasDetail && (
        <ChevronRight className="cursor-pointer" onClick={onToggle} />
      )}
    </div>
    {isOpen && term.hasDetail && (
      <p className="text-sm text-gray-600">{'내용'.repeat(50)}</p>
    )}
  </>
);

export function Signup() {
  const dispatch = useDispatch();
  const { userType, openTerms, agreements } = useSelector(
    (state: RootState) => state.signup ?? signupInitialState
  );

  const isBusinessUser = userType !== '일반회원';
  const visibleTerms = TERMS.filter((term) =>
    term.showForUserTypes.includes(userType)
  );

  return (
    <div className="flex w-screen flex-col items-center gap-4 p-4">
      <div className="flex w-full max-w-md gap-2">
        {USER_TYPES.map((type) => (
          <Button
            key={type.value}
            label={type.label}
            variant="secondary"
            isActive={userType === type.value}
            onClick={() => dispatch(setUserType(type.value))}
            className="flex-1"
          />
        ))}
      </div>

      <div className="flex w-full max-w-md flex-col gap-4">
        <LabeledInputWithButton
          id="userid"
          label="아이디"
          buttonLabel="중복확인"
        />
        <LabeledInput id="password" label="비밀번호" type="password" />
        <LabeledInput id="checkpw" label="비밀번호확인" type="password" />
        {!isBusinessUser && <LabeledInput id="username" label="이름" />}
        <LabeledInputWithButton
          id="phone"
          label="휴대폰번호"
          type="tel"
          buttonLabel="인증하기"
        />

        {isBusinessUser && (
          <>
            <LabeledInput id="shopName" label="상호명" />
            <LabeledInput id="username" label="대표자명" />
            <LabeledInput id="shopNumber" label="사업자 등록번호" />

            <div className="flex flex-col gap-1">
              <label htmlFor="shopAddress">사업자 주소지</label>
              <div className="flex gap-2">
                <Input id="shopAddress" className="w-41.5" readOnly />
                <Button label="주소찾기" variant="primary" />
              </div>
              <div className="flex w-full gap-2">
                <Input id="shopAddressDetail1" className="w-full" readOnly />
                <Input id="shopAddressDetail2" className="w-full" readOnly />
              </div>
            </div>

            <div className="flex w-full gap-2">
              <div className="flex w-full flex-col">
                <label htmlFor="businessType">업종</label>
                <SelectBox
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="businessCategory">업태</label>
                <SelectBox
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                />
              </div>
            </div>

            <LabeledInputWithButton
              id="businessCert"
              label="사업자등록증 업로드"
              buttonLabel="업로드"
            />

            <div className="flex w-full flex-col gap-2">
              <label htmlFor="mainCategory">주요 카테고리</label>
              <SelectBox
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                ]}
              />
            </div>
          </>
        )}

        <div className="flex flex-col gap-1">
          <span className="font-medium">약관동의</span>
          <div className="flex flex-col gap-2 border bg-gray-900 p-3 text-white">
            <Checkbox
              id="agree-all"
              label="전체동의"
              checked={agreements.all}
              onChange={(isChecked: boolean) =>
                dispatch(setAllAgreements(isChecked))
              }
              className="border-b border-gray-300 pb-2"
            />
            {visibleTerms.map((term) => (
              <TermItemComponent
                key={term.key}
                term={term}
                checked={agreements[term.key]}
                isOpen={openTerms[term.key]}
                onCheck={(isChecked: boolean) =>
                  dispatch(setAgreement({ key: term.key, isChecked }))
                }
                onToggle={() => dispatch(toggleTerm(term.key))}
              />
            ))}
          </div>
        </div>

        <Button label={SUBMIT_BUTTON_LABELS[userType]} variant="primary" />
      </div>
    </div>
  );
}
