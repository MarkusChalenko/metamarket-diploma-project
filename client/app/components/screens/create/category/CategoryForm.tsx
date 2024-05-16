import { redirect } from "next/dist/server/api-utils";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button/Button";

import { useActions } from "@/hooks/useActions";
import { useCategory } from "@/hooks/useCategory";

import { Meta } from "@/utils/meta/Meta";

import backArrowImage from "@/assets/images/backarrow.svg";

import { typeAndCategories } from "../../../../shared/data/category.data";
import styles from "../Create.module.scss";
import { ICategory, ICategoryController } from "../create.interface";

const DynamicSelect = dynamic(() => import("@/ui/select/Select"), {
  ssr: false,
});

export const CategoryForm = (): JSX.Element => {
  const [type, setType] = useState<ICategory[]>([]);
  const [categoryName, setCategoryName] = useState<ICategory[]>([]);
  const [subCategories, setSubCategories] = useState<ICategory[]>([]);

  const { saveCategory } = useActions();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    resetField,
    formState: { isValid },
  } = useForm<ICategoryController>({
    mode: "onChange",
  });

  const watchType = watch("type");
  const watchCategoryName = watch("categoryName");

  const { back } = useRouter();

  const processData = (item: ICategory) => {
    return {
      value: item.type,
      label: item.type,
    };
  };

  useEffect(() => {
    setType(typeAndCategories);
  }, []);

  useEffect(() => {
    setCategoryName(
      type.find((item: any) => item.type === watchType)?.categoryArr || []
    );

    setTimeout(() => resetField("categoryName"));
  }, [type, watchType]);

  useEffect(() => {
    setSubCategories(
      categoryName.find((item: any) => item.type === watchCategoryName)
        ?.categoryArr || []
    );

    setTimeout(() => resetField("subCategories"));
  }, [categoryName, watchCategoryName, watchType]);

  const onSubmit: SubmitHandler<ICategoryController> = async (data) => {
    saveCategory(data);
    reset();
  };

  const { push } = useRouter();
  const { category } = useCategory();

  return (
    <Meta title="Create Item" description="Select item category">
      <div className={styles.container}>
        <div>
          <div className="flex items-center">
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

            <h2 className="h2 ml-2">NFT Digital Proof registration</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="type"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DynamicSelect
                  field={field}
                  placeholder="Type"
                  options={type.map(processData)}
                  error={error}
                />
              )}
              rules={{
                required: "Please select type",
              }}
            />
            <Controller
              name="categoryName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DynamicSelect
                  field={field}
                  placeholder="Category"
                  options={categoryName.map(processData)}
                  error={error}
                />
              )}
              rules={{
                required: "Please select category name",
              }}
            />
            <Controller
              name="subCategories"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DynamicSelect
                  field={field}
                  placeholder="Category"
                  options={subCategories.map(processData)}
                  error={error}
                />
              )}
              rules={{
                required: "Please select sub categories",
              }}
            />

            <Button
              title="Next stage"
              appearance="large"
              className="btn-primary mt-8"
              type="submit"
              onClick={() => isValid && push("/create/item")}
            />
          </form>
        </div>
      </div>
    </Meta>
  );
};
