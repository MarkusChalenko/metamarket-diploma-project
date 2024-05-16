import { randomBytes } from "crypto";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import QRCode from "qrcode";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { stripHtml } from "string-strip-html";

import { Button } from "@/components/ui/button/Button";
import { Field } from "@/components/ui/field/Field";
import { UploadField } from "@/components/ui/upload/UploadField";

import { Picture } from "@/ui/picture/Picture";
import { SlugField } from "@/ui/slug/SlugField";

import { useActions } from "@/hooks/useActions";
import { useCategory } from "@/hooks/useCategory";

import { blockchain } from "@/shared/data/blockchain.data";
import { TypeItem } from "@/shared/types/item.types";

import { Meta } from "@/utils/meta/Meta";
import { generateSlug } from "@/utils/string/generateSlug";

import addImage from "@/assets/images/add.svg";
import backArrowImage from "@/assets/images/backarrow.svg";

import styles from "../Create.module.scss";
import { IItemInputAndController } from "../create.interface";

const DynamicSelect = dynamic(() => import("@/ui/select/Select"), {
  ssr: false,
});

const DynamicEditorField = dynamic(
  () => import("@/components/ui/editor/EditorField"),
  {
    ssr: false,
  }
);

export const ItemForm: FC = (): JSX.Element => {
  const { back } = useRouter();

  const { category } = useCategory();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const {
    control,
    register,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IItemInputAndController>({
    mode: "onChange",
  });

  const processData = (item: string) => {
    return {
      value: item,
      label: item,
    };
  };

  const [currentUrl, setCurrentUrl] = useState("");

  const generateQrCode = async () => {
    if (currentUrl) {
      const res = await QRCode.toDataURL(currentUrl, {
        type: "image/webp",
      });

      setValue("qr_url", res);
    }
  };

  const generateCustomSlug = (data: keyof IItemInputAndController) => {
    setIsDisabled(true);
    const res = generateSlug(getValues(data));
    return res;
  };

  const editSlug = () => {
    setIsDisabled(false);
    setValue("slug", "");
  };

  const { createItem } = useActions();

  const onSubmit: SubmitHandler<IItemInputAndController> = ({
    name,
    description,
    blockchain,
    slug,
    image_url,
    qr_url,
  }) => {
    const data: TypeItem = {
      token_address: (Math.random() + 1).toString(32).substring(8),
      user_id: randomBytes(32).toString(),
      name: name,
      description: description,
      product_story: "empty",
      price: 0,
      currency: blockchain,
      status: "empty",
      qr_url: qr_url,
      nft_check_url: slug,
      image_url: image_url,
      history: [
        {
          creator: "empty",
          date: "empty",
          action: "empty",
          photos_videos: "empty",
        },
      ],
    };

    createItem(data);
    reset();
  };

  return (
    <Meta title="Create Item" description="Select item category">
      <div className="flex items-center mb-8 mt-8 ml-16">
        <span onClick={() => back()} className="cursor-pointer">
          <a className="flex items-center animate-fade">
            <Image
              src={backArrowImage}
              width={50}
              height={50}
              alt="Back Arrow"
              draggable={false}
            />
          </a>
        </span>
        <h2 className="h2 ml-4">Create new item</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fields}>
          <div className="grid grid-rows-1">
            <div className="block row-span">
              <Controller
                name="qr_url"
                control={control}
                render={({ fieldState: { error }, field: { value } }) => (
                  <>
                    <div className={styles.image}>
                      {value ? (
                        <Picture appearance="image" url={value} />
                      ) : (
                        <Picture appearance="qr" />
                      )}
                      {error && (
                        <div className={styles.message}>{error.message}</div>
                      )}
                    </div>

                    <div className={styles.upload}>
                      <Button
                        title="Customize QR Code"
                        appearance="small"
                        className="btn-ghost mt-8"
                        onClick={generateQrCode}
                      />
                    </div>
                  </>
                )}
                rules={{
                  required: "QR is required",
                }}
              />
            </div>

            <div className="block row-span">
              <Controller
                name="image_url"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <UploadField
                    onChange={onChange}
                    value={value}
                    error={error}
                    placeholder="Upload Image"
                  />
                )}
                rules={{
                  required: "Image is required",
                }}
              />
            </div>
          </div>
          <div>
            <p className="text-xl">
              <b>Category</b>{" "}
              <span className="ml-4">
                {category.type} / {category.categoryName} /{" "}
                {category.subCategories}
              </span>
            </p>

            <Controller
              name="blockchain"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DynamicSelect
                  field={field}
                  placeholder="Blockchain"
                  options={blockchain.value.map(processData)}
                  error={error}
                />
              )}
              rules={{
                required: "Please select blockchain",
              }}
            />
            <Field
              placeholder="Name"
              {...register("name", {
                required: "NFT Digital Proof check link is required",
                minLength: {
                  value: 4,
                  message: "Link must be at least 4 characters",
                },
                maxLength: {
                  value: 28,
                  message: "Link must be less than 28 characters",
                },
              })}
              error={errors.name}
            />

            <SlugField
              register={register}
              error={errors.slug}
              isDisabled={isDisabled}
              link="https://nft-check.io/"
              generate={() => {
                setValue(
                  "slug",
                  isDisabled
                    ? generateSlug(getValues("name"))
                    : generateCustomSlug("slug")
                );
                setCurrentUrl(
                  `${process.env.NFT_CHECK_URL}${getValues("slug")}`
                );
              }}
              edit={editSlug}
            />

            <Controller
              name="description"
              defaultValue=""
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <DynamicEditorField
                  onChange={onChange}
                  value={value}
                  error={error}
                  placeholder="Brief Description"
                />
              )}
              rules={{
                validate: {
                  required: (value) =>
                    (value && stripHtml(value).result.length > 0) ||
                    "Description is required",
                },
              }}
            />

            <div className="flex items-center justify-center mt-8">
              <div>
                <p className="font-light text-xl block">Properties</p>
                <span className="text-lg font-light text-gray-500">
                  Textural traits that show up as rectangles
                </span>
              </div>
              <div className="ml-auto flex items-center justify-center bg-white shadow-sm p-2 rounded-lg cursor-pointer">
                <Image
                  src={addImage}
                  width={50}
                  height={50}
                  alt="Back Arrow"
                  draggable={false}
                />
              </div>
            </div>
            <Button
              title="Preview and Finish NFT Digital Proof registration"
              appearance="large"
              className="btn-primary mt-16"
            />
          </div>
        </div>
      </form>
    </Meta>
  );
};
