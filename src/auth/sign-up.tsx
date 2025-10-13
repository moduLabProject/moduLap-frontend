import { useState } from 'react';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Checkbox } from '../components/ui/Checkbox';
import { SelectBox } from '../components/ui/Selectbox';

import { ChevronRight } from 'lucide-react';

interface LabeledInputProps {
  id?: string;
  label: string;
  type?: 'text' | 'password' | 'number' | 'email' | 'tel';
  placeholder?: string;
  className?: string;
}

const LabeledInput = ({
  id,
  label,
  type = 'text',
  className,
  placeholder,
}: LabeledInputProps) => (
  <div className={`flex flex-col gap-1 ${className || ''}`}>
    <label htmlFor={id}>{label}</label>
    <Input id={id} type={type} placeholder={placeholder} className="w-full" />
  </div>
);

interface LabeledInputWithButtonProps {
  id?: string;
  label: string;
  type?: 'text' | 'password' | 'number' | 'email' | 'tel';
  buttonLabel: string;
  onButtonClick?: () => void;
  placeholder?: string;
  className?: string;
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
      <Button
        label={buttonLabel}
        className="bg-gray-900 text-white"
        onClick={onButtonClick}
      />
    </div>
  </div>
);

export function Signup() {
  const [userType, setUserType] = useState<'일반회원' | '작가' | '소품샵'>(
    '일반회원'
  );

  const [openTerms, setOpenTerms] = useState<{ [key: string]: boolean }>({});

  const toggleTerm = (termKey: string) => {
    setOpenTerms((prev) => ({ ...prev, [termKey]: !prev[termKey] }));
  };

  const [agreements, setAgreements] = useState({
    all: false,
    age: false,
    terms: false,
    businessInfo: false,
    settlement: false,
    fraud: false,
    customerData: false,
    marketing: false,
    notification: false,
  });

  const handleCheckboxChange = (key: keyof typeof agreements) => {
    setAgreements((prev) => {
      const newAgreements = { ...prev, [key]: !prev[key] };

      const allChecked = Object.entries(newAgreements)
        .filter(([k]) => k !== 'all')
        .every(([, v]) => v);

      newAgreements.all = allChecked;
      return newAgreements;
    });
  };

  const handleAllAgree = () => {
    setAgreements((prev) => {
      const newValue = !prev.all;
      return Object.fromEntries(
        Object.keys(prev).map((key) => [key, newValue])
      ) as typeof prev;
    });
  };

  return (
    <div className="flex w-screen flex-col items-center gap-4 p-4">
      <div className="flex w-full max-w-md gap-2">
        {/* 버튼 컴포넌트 수정필요 */}
        <Button
          className="flex-1 border-gray-900 text-gray-900 focus:bg-gray-900 focus:text-white"
          label="일반회원"
          onClick={() => setUserType('일반회원')}
        />
        <Button
          className="flex-1 border-gray-900 text-gray-900 focus:bg-gray-900 focus:text-white"
          label="작가"
          onClick={() => setUserType('작가')}
        />
        <Button
          className="flex-1 border-gray-900 text-gray-900 focus:bg-gray-900 focus:text-white"
          label="소품샵"
          onClick={() => setUserType('소품샵')}
        />
      </div>

      <div className="flex w-full max-w-md flex-col gap-4">
        <LabeledInputWithButton
          id="userid"
          label="아이디"
          buttonLabel="중복확인"
        />
        <LabeledInput id="password" label="비밀번호" type="password" />
        <LabeledInput id="checkpw" label="비밀번호확인" type="password" />

        {userType === '일반회원' && <LabeledInput id="username" label="이름" />}

        <LabeledInputWithButton
          id="phone"
          label="휴대폰번호"
          type="tel"
          buttonLabel="인증하기"
        />

        {userType !== '일반회원' && (
          <>
            <LabeledInput id="shopName" label="상호명" />
            <LabeledInput id="username" label="대표자명" />
            <LabeledInput id="shopNumber" label="사업자 등록번호" />

            <div className="flex flex-col gap-1">
              <label htmlFor="shopAddress">사업자 주소지</label>
              <div className="flex gap-2">
                <Input id="shopAddress" className="w-41.5" readOnly />
                <Button
                  label="주소찾기"
                  className="w-24.7 bg-gray-900 text-white"
                />
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
              onChange={handleAllAgree}
              className="border-b border-gray-300 pb-2"
            />

            <div className="flex justify-between">
              <Checkbox
                id="agree-age"
                label="만 14세 이상입니다 (필수)"
                checked={agreements.age}
                onChange={() => handleCheckboxChange('age')}
              />
              <ChevronRight
                className="cursor-pointer"
                onClick={() => toggleTerm('age')}
              />
            </div>
            {openTerms.age && (
              <p className="text-sm text-gray-600">{'내용'.repeat(100)}</p>
            )}

            <div className="flex justify-between">
              <Checkbox
                id="agree-terms"
                label="이용약관 (필수)"
                checked={agreements.terms}
                onChange={() => handleCheckboxChange('terms')}
              />
              <ChevronRight
                className="cursor-pointer"
                onClick={() => toggleTerm('terms')}
              />
            </div>
            {openTerms.terms && (
              <p className="text-sm text-gray-600">{'내용'.repeat(100)}</p>
            )}

            {userType !== '일반회원' && (
              <>
                <div className="flex justify-between">
                  <Checkbox
                    id="agree-business-info"
                    label="사업자 정보 확인 및 등록 동의 (필수)"
                    checked={agreements.businessInfo}
                    onChange={() => handleCheckboxChange('businessInfo')}
                  />
                  <ChevronRight
                    className="cursor-pointer"
                    onClick={() => toggleTerm('businessInfo')}
                  />
                </div>
                {openTerms.businessInfo && (
                  <p className="text-sm text-gray-600">{'내용'.repeat(100)}</p>
                )}

                <div className="flex justify-between">
                  <Checkbox
                    id="agree-settlement"
                    label="전자상거래법 및 관련 법률 준수 동의 (필수)"
                    checked={agreements.settlement}
                  />
                </div>

                <div className="flex justify-between">
                  <Checkbox
                    id="agree-settlement"
                    label="정산 및 수수료 정책 동의 (필수)"
                    checked={agreements.settlement}
                  />
                </div>

                <div className="flex justify-between">
                  <Checkbox
                    id="agree-fraud"
                    label="부정거래 방지 및 제재 정책 동의 (필수)"
                    checked={agreements.fraud}
                    onChange={() => handleCheckboxChange('fraud')}
                  />
                  <ChevronRight
                    className="cursor-pointer"
                    onClick={() => toggleTerm('fraud')}
                  />
                </div>
                {openTerms.fraud && (
                  <p className="text-sm text-gray-600">{'내용'.repeat(100)}</p>
                )}

                <div className="flex justify-between">
                  <Checkbox
                    id="agree-customer-data"
                    label="고객 리뷰 및 데이터 활용 동의 (선택)"
                    checked={agreements.customerData}
                  />
                </div>
              </>
            )}

            <Checkbox
              id="agree-marketing"
              label="개인정보 마케팅 활용동의 (선택)"
              checked={agreements.marketing}
            />
            <Checkbox
              id="agree-notification"
              label="이벤트, 쿠폰, 특가 알림 메일 및 sms 등 수신 (선택)"
              checked={agreements.notification}
            />
          </div>
        </div>

        {userType === '일반회원' && (
          <Button
            label="회원가입하기"
            className="w-full bg-gray-900 text-white"
          />
        )}
        {userType === '작가' && (
          <Button
            label="작가 등록 신청"
            className="w-full bg-gray-900 text-white"
          />
        )}
        {userType === '소품샵' && (
          <Button
            label="소품샵 등록 신청"
            className="w-full bg-gray-900 text-white"
          />
        )}
      </div>
    </div>
  );
}
