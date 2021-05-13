.class public Landroidx/constraintlayout/widget/e$a;
.super Landroidx/constraintlayout/widget/ConstraintLayout$a;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/constraintlayout/widget/e;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x9
    name = "a"
.end annotation


# instance fields
.field public na:F

.field public oa:Z

.field public pa:F

.field public qa:F

.field public ra:F

.field public sa:F

.field public ta:F

.field public ua:F

.field public va:F

.field public wa:F

.field public xa:F

.field public ya:F

.field public za:F


# direct methods
.method public constructor <init>(II)V
    .locals 0

    invoke-direct {p0, p1, p2}, Landroidx/constraintlayout/widget/ConstraintLayout$a;-><init>(II)V

    const/high16 p1, 0x3f800000    # 1.0f

    iput p1, p0, Landroidx/constraintlayout/widget/e$a;->na:F

    const/4 p2, 0x0

    iput-boolean p2, p0, Landroidx/constraintlayout/widget/e$a;->oa:Z

    const/4 p2, 0x0

    iput p2, p0, Landroidx/constraintlayout/widget/e$a;->pa:F

    iput p2, p0, Landroidx/constraintlayout/widget/e$a;->qa:F

    iput p2, p0, Landroidx/constraintlayout/widget/e$a;->ra:F

    iput p2, p0, Landroidx/constraintlayout/widget/e$a;->sa:F

    iput p1, p0, Landroidx/constraintlayout/widget/e$a;->ta:F

    iput p1, p0, Landroidx/constraintlayout/widget/e$a;->ua:F

    iput p2, p0, Landroidx/constraintlayout/widget/e$a;->va:F

    iput p2, p0, Landroidx/constraintlayout/widget/e$a;->wa:F

    iput p2, p0, Landroidx/constraintlayout/widget/e$a;->xa:F

    iput p2, p0, Landroidx/constraintlayout/widget/e$a;->ya:F

    iput p2, p0, Landroidx/constraintlayout/widget/e$a;->za:F

    return-void
.end method

.method public constructor <init>(Landroid/content/Context;Landroid/util/AttributeSet;)V
    .locals 3

    invoke-direct {p0, p1, p2}, Landroidx/constraintlayout/widget/ConstraintLayout$a;-><init>(Landroid/content/Context;Landroid/util/AttributeSet;)V

    const/high16 v0, 0x3f800000    # 1.0f

    iput v0, p0, Landroidx/constraintlayout/widget/e$a;->na:F

    const/4 v1, 0x0

    iput-boolean v1, p0, Landroidx/constraintlayout/widget/e$a;->oa:Z

    const/4 v2, 0x0

    iput v2, p0, Landroidx/constraintlayout/widget/e$a;->pa:F

    iput v2, p0, Landroidx/constraintlayout/widget/e$a;->qa:F

    iput v2, p0, Landroidx/constraintlayout/widget/e$a;->ra:F

    iput v2, p0, Landroidx/constraintlayout/widget/e$a;->sa:F

    iput v0, p0, Landroidx/constraintlayout/widget/e$a;->ta:F

    iput v0, p0, Landroidx/constraintlayout/widget/e$a;->ua:F

    iput v2, p0, Landroidx/constraintlayout/widget/e$a;->va:F

    iput v2, p0, Landroidx/constraintlayout/widget/e$a;->wa:F

    iput v2, p0, Landroidx/constraintlayout/widget/e$a;->xa:F

    iput v2, p0, Landroidx/constraintlayout/widget/e$a;->ya:F

    iput v2, p0, Landroidx/constraintlayout/widget/e$a;->za:F

    sget-object v0, Landroidx/constraintlayout/widget/i;->ConstraintSet:[I

    invoke-virtual {p1, p2, v0}, Landroid/content/Context;->obtainStyledAttributes(Landroid/util/AttributeSet;[I)Landroid/content/res/TypedArray;

    move-result-object p1

    invoke-virtual {p1}, Landroid/content/res/TypedArray;->getIndexCount()I

    move-result p2

    :goto_0
    if-ge v1, p2, :cond_c

    invoke-virtual {p1, v1}, Landroid/content/res/TypedArray;->getIndex(I)I

    move-result v0

    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_alpha:I

    if-ne v0, v2, :cond_0

    iget v2, p0, Landroidx/constraintlayout/widget/e$a;->na:F

    invoke-virtual {p1, v0, v2}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v0

    iput v0, p0, Landroidx/constraintlayout/widget/e$a;->na:F

    goto/16 :goto_2

    :cond_0
    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_elevation:I

    if-ne v0, v2, :cond_1

    iget v2, p0, Landroidx/constraintlayout/widget/e$a;->pa:F

    invoke-virtual {p1, v0, v2}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v0

    iput v0, p0, Landroidx/constraintlayout/widget/e$a;->pa:F

    const/4 v0, 0x1

    iput-boolean v0, p0, Landroidx/constraintlayout/widget/e$a;->oa:Z

    goto/16 :goto_2

    :cond_1
    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_rotationX:I

    if-ne v0, v2, :cond_2

    iget v2, p0, Landroidx/constraintlayout/widget/e$a;->ra:F

    invoke-virtual {p1, v0, v2}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v0

    iput v0, p0, Landroidx/constraintlayout/widget/e$a;->ra:F

    goto/16 :goto_2

    :cond_2
    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_rotationY:I

    if-ne v0, v2, :cond_3

    iget v2, p0, Landroidx/constraintlayout/widget/e$a;->sa:F

    invoke-virtual {p1, v0, v2}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v0

    iput v0, p0, Landroidx/constraintlayout/widget/e$a;->sa:F

    goto :goto_2

    :cond_3
    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_rotation:I

    if-ne v0, v2, :cond_4

    iget v2, p0, Landroidx/constraintlayout/widget/e$a;->qa:F

    invoke-virtual {p1, v0, v2}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v0

    iput v0, p0, Landroidx/constraintlayout/widget/e$a;->qa:F

    goto :goto_2

    :cond_4
    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_scaleX:I

    if-ne v0, v2, :cond_5

    iget v2, p0, Landroidx/constraintlayout/widget/e$a;->ta:F

    invoke-virtual {p1, v0, v2}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v0

    iput v0, p0, Landroidx/constraintlayout/widget/e$a;->ta:F

    goto :goto_2

    :cond_5
    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_scaleY:I

    if-ne v0, v2, :cond_6

    iget v2, p0, Landroidx/constraintlayout/widget/e$a;->ua:F

    invoke-virtual {p1, v0, v2}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v0

    iput v0, p0, Landroidx/constraintlayout/widget/e$a;->ua:F

    goto :goto_2

    :cond_6
    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_transformPivotX:I

    if-ne v0, v2, :cond_7

    iget v2, p0, Landroidx/constraintlayout/widget/e$a;->va:F

    invoke-virtual {p1, v0, v2}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v0

    iput v0, p0, Landroidx/constraintlayout/widget/e$a;->va:F

    goto :goto_2

    :cond_7
    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_transformPivotY:I

    if-ne v0, v2, :cond_8

    iget v2, p0, Landroidx/constraintlayout/widget/e$a;->wa:F

    invoke-virtual {p1, v0, v2}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v0

    iput v0, p0, Landroidx/constraintlayout/widget/e$a;->wa:F

    goto :goto_2

    :cond_8
    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_translationX:I

    if-ne v0, v2, :cond_9

    iget v2, p0, Landroidx/constraintlayout/widget/e$a;->xa:F

    :goto_1
    invoke-virtual {p1, v0, v2}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v0

    iput v0, p0, Landroidx/constraintlayout/widget/e$a;->xa:F

    goto :goto_2

    :cond_9
    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_translationY:I

    if-ne v0, v2, :cond_a

    iget v2, p0, Landroidx/constraintlayout/widget/e$a;->ya:F

    invoke-virtual {p1, v0, v2}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v0

    iput v0, p0, Landroidx/constraintlayout/widget/e$a;->ya:F

    goto :goto_2

    :cond_a
    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_translationZ:I

    if-ne v0, v2, :cond_b

    iget v2, p0, Landroidx/constraintlayout/widget/e$a;->za:F

    goto :goto_1

    :cond_b
    :goto_2
    add-int/lit8 v1, v1, 0x1

    goto/16 :goto_0

    :cond_c
    return-void
.end method
