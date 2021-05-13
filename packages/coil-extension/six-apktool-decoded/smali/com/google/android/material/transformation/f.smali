.class Lcom/google/android/material/transformation/f;
.super Landroid/animation/AnimatorListenerAdapter;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/google/android/material/transformation/FabTransformationBehavior;->a(Landroid/view/View;Landroid/view/View;ZZLcom/google/android/material/transformation/FabTransformationBehavior$a;FFLjava/util/List;Ljava/util/List;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Lb/a/a/a/c/f;

.field final synthetic b:Lcom/google/android/material/transformation/FabTransformationBehavior;


# direct methods
.method constructor <init>(Lcom/google/android/material/transformation/FabTransformationBehavior;Lb/a/a/a/c/f;)V
    .locals 0

    iput-object p1, p0, Lcom/google/android/material/transformation/f;->b:Lcom/google/android/material/transformation/FabTransformationBehavior;

    iput-object p2, p0, Lcom/google/android/material/transformation/f;->a:Lb/a/a/a/c/f;

    invoke-direct {p0}, Landroid/animation/AnimatorListenerAdapter;-><init>()V

    return-void
.end method


# virtual methods
.method public onAnimationEnd(Landroid/animation/Animator;)V
    .locals 1

    iget-object p1, p0, Lcom/google/android/material/transformation/f;->a:Lb/a/a/a/c/f;

    invoke-interface {p1}, Lb/a/a/a/c/f;->getRevealInfo()Lb/a/a/a/c/f$d;

    move-result-object p1

    const v0, 0x7f7fffff    # Float.MAX_VALUE

    iput v0, p1, Lb/a/a/a/c/f$d;->c:F

    iget-object v0, p0, Lcom/google/android/material/transformation/f;->a:Lb/a/a/a/c/f;

    invoke-interface {v0, p1}, Lb/a/a/a/c/f;->setRevealInfo(Lb/a/a/a/c/f$d;)V

    return-void
.end method
