.class La/j/a/F;
.super Landroid/transition/Transition$EpicenterCallback;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/j/a/J;->c(Ljava/lang/Object;Landroid/view/View;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroid/graphics/Rect;

.field final synthetic b:La/j/a/J;


# direct methods
.method constructor <init>(La/j/a/J;Landroid/graphics/Rect;)V
    .locals 0

    iput-object p1, p0, La/j/a/F;->b:La/j/a/J;

    iput-object p2, p0, La/j/a/F;->a:Landroid/graphics/Rect;

    invoke-direct {p0}, Landroid/transition/Transition$EpicenterCallback;-><init>()V

    return-void
.end method


# virtual methods
.method public onGetEpicenter(Landroid/transition/Transition;)Landroid/graphics/Rect;
    .locals 0

    iget-object p1, p0, La/j/a/F;->a:Landroid/graphics/Rect;

    return-object p1
.end method
